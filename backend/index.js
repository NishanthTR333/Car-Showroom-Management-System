require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();
app.use(cors());              // Allow frontend to connect
app.use(express.json());      // Allow server to read JSON bodies

// Connection to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL // e.g., "postgresql://user:pass@host:port/db_name"
});

// API endpoints

app.post('/api/users/login', async (req, res) => {
  try {
    const { id, pw } = req.body;

    // Find user
    const userResult = await pool.query('SELECT * FROM user WHERE id = $1', [id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User ID Not Registered' });
    }

    const user = userResult.rows[0];

    // *** SECURITY UPGRADE ***
    // Compare the submitted password (pw) with the hashed password in the DB
    const isMatch = await bcrypt.compare(pw, user.pass);

    if (isMatch) {
      // Passwords match! Send a success response (later, you'll send a JWT token)
      res.json({ message: 'Login Successful', userId: user.id });
    } else {
      // Passwords don't match
      res.status(400).json({ message: 'Wrong Password' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});