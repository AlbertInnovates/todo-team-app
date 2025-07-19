// backend/test-server.js
const express = require('express');
const app = express();
const PORT = 5001;

// Add these critical middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route that always works
app.get('/', (req, res) => {
  res.send('✅ Backend is working!');
});

// Test registration endpoint
app.post('/api/auth/register', (req, res) => {
  console.log('Received registration:', req.body);
  res.json({
    message: "Registration successful!",
    user: { id: 1, name: "Test User", email: "test@example.com" },
    token: "test_token_123"
  });
});

// Handle all other routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
});