require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Database Configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'todo_app',
  password: process.env.DB_PASSWORD || 'Albertnisingizwe@34',
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log(`✅ Database connected at ${res.rows[0].now}`);
  }
});

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_strong_secret_here';

// ================================================
// 1. USER REGISTRATION ENDPOINT
// ================================================
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if email exists
    const emailCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.rows[0].id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Successful response
    res.status(201).json({
      message: 'Registration successful!',
      user: newUser.rows[0],
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ================================================
// 2. USER LOGIN ENDPOINT
// ================================================
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    // Find user by email
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userResult.rows[0];
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Successful response
    res.json({
      message: 'Login successful!',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ================================================
// 3. AUTHENTICATION MIDDLEWARE
// ================================================
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ================================================
// 4. TASK MANAGEMENT ENDPOINTS
// ================================================

// Create new task
app.post('/api/tasks', authenticate, async (req, res) => {
  const { title, description, due_date } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newTask = await pool.query(
      `INSERT INTO tasks (title, description, due_date, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, due_date, req.userId]
    );
    
    res.status(201).json(newTask.rows[0]);
    
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's tasks
app.get('/api/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1',
      [req.userId]
    );
    
    res.json(tasks.rows);
    
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update task status
app.patch('/api/tasks/:id/complete', authenticate, async (req, res) => {
  const taskId = req.params.id;
  
  try {
    const updatedTask = await pool.query(
      `UPDATE tasks SET completed = true 
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [taskId, req.userId]
    );
    
    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(updatedTask.rows[0]);
    
  } catch (error) {
    console.error('Complete task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete task
app.delete('/api/tasks/:id', authenticate, async (req, res) => {
  const taskId = req.params.id;
  
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
      [taskId, req.userId]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.sendStatus(204);
    
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ================================================
// 5. TASK ASSIGNMENT ENDPOINT
// ================================================
app.post('/api/tasks/:id/assign', authenticate, async (req, res) => {
  const taskId = req.params.id;
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID required' });
  }

  try {
    // Verify task exists and belongs to current user
    const taskCheck = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [taskId, req.userId]
    );
    
    if (taskCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Verify target user exists
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Create assignment
    await pool.query(
      `INSERT INTO assignments (task_id, user_id)
       VALUES ($1, $2)`,
      [taskId, userId]
    );
    
    res.status(201).json({ message: 'Task assigned successfully' });
    
  } catch (error) {
    console.error('Assign task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});