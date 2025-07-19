const { Pool } = require('pg');

console.log('Testing database connection...');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo_app',
  password: 'Albertnisingizwe@34',
  port: 5432,
});

pool.query('SELECT NOW() AS current_time', (err, res) => {
  if (err) {
    console.error('❌ DATABASE CONNECTION FAILED:', err.message);
    console.error('Full error:', err);
  } else {
    console.log('✅ DATABASE CONNECTED SUCCESSFULLY!');
    console.log('Current database time:', res.rows[0].current_time);
  }
  pool.end();
});