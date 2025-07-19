// Top of file
const util = require('util');

// After creating pool
pool.on('error', (err) => {
  console.error('Database error:', err);
});

// In registration endpoint (before try block)
console.log('Registration request:', req.body);
// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Database Configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'todo_app',
  password: process.env.DB_PASSWORD || 'Albertnisingizwe@34',
  port: process.env.DB_PORT || 5432,
});
// Add detailed request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log(`✅ Database connected at ${res.rows[0].now}`);
  }
});
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');
    res.json({
      database: "Connected",
      time: result.rows[0].current_time
    });
  } catch (err) {
    console.error('Database test failed:', err);
    res.status(500).json({
      error: "Database connection failed",
      details: err.message
    });
  }
});
// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_strong_secret_here';

// ======================
// ROUTES
// ======================
app.get('/api/db-test', async (req, res) => {
  try {
    // Test connection
    const connResult = await pool.query('SELECT NOW() AS current_time');
    
    // Test users table
    const tableResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      ) AS table_exists
    `);
    
    res.json({
      status: 'Database connected',
      current_time: connResult.rows[0].current_time,
      users_table_exists: tableResult.rows[0].table_exists
    });
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error.message
    });
  }
});
// Root endpoint - MUST HAVE
app.get('/', (req, res) => {
  res.send('🚀 Todo App Backend is Running!');
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Detailed validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  console.log(`[REGISTER] Starting registration for: ${email}`);
  
  try {
    // 1. Check if user exists
    const userCheck = await pool.query(
      'SELECT id FROM users WHERE email = $1', 
      [email]
    );
    
    if (userCheck.rows.length > 0) {
      console.log(`[REGISTER] Email already exists: ${email}`);
      return res.status(409).json({ error: 'Email already registered' });
    }

    // 2. Hash password with error handling
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log('[REGISTER] Password hashed successfully');
    } catch (hashError) {
      console.error('[REGISTER] Password hash failed:', hashError);
      return res.status(500).json({ error: 'Password processing failed' });
    }

    // 3. Create user
    const newUser = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );
    console.log('[REGISTER] User created:', newUser.rows[0]);

    // 4. Generate token
    const token = jwt.sign(
      { userId: newUser.rows[0].id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Registration successful!',
      user: newUser.rows[0],
      token
    });
    
  } catch (error) {
    console.error('[REGISTER] CRITICAL ERROR:', error.stack);
    
    // Handle specific PostgreSQL errors
    if (error.code) {
      console.error('PostgreSQL error code:', error.code);
      
      // Unique violation (duplicate email)
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Email already registered' });
      }
    }
    
    res.status(500).json({ 
      error: 'Server error',
      details: error.message // Send error details for debugging
    });
  }
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`✅ Registration: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`✅ Login: POST http://localhost:${PORT}/api/auth/login`);
});