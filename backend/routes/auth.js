const express = require('express');
const router = express.Router();
const db = require('../db'); // Imports your db.js connection
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For login tokens
require('dotenv').config();

//=========================================================
// REPLACES: register.php, user_register1.php, user_register2.php
//=========================================================
router.post('/register', async (req, res) => {
  try {
    // 1. Get data from the frontend request body
    const { id, name, pass, dob, mob, yob, phoneno, mail } = req.body;

    // 2. Check if user already exists
    const userCheck = await db.query("SELECT * FROM \"user\" WHERE id = $1 OR mail = $2", [id, mail]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Username or email already exists." });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    // 4. Insert the new user into the database
    // Note: Your old code saves dob, mob, yob as separate ints. This new code
    // assumes you might change 'dob' to a single DATE column, which is better.
    // If you keep them separate, your query will be like:
    // "INSERT INTO ... (id, name, pass, dob, mob, yob, ...) VALUES ($1, $2, $3, $4, $5, $6, ...)"
    const newUser = await db.query(
      "INSERT INTO \"user\" (id, name, pass, phoneno, mail) VALUES ($1, $2, $3, $4, $5) RETURNING id, name",
      [id, name, hashedPassword, phoneno, mail]
    );

    // 5. Send success response
    res.status(201).json({
      message: "User registered successfully!",
      user: newUser.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//=========================================================
// REPLACES: user_login.php
//=========================================================
router.post('/login', async (req, res) => {
  try {
    // 1. Get id and password from request body
    const { id, pass } = req.body;

    // 2. Check if user exists
    const userQuery = await db.query("SELECT * FROM \"user\" WHERE id = $1", [id]);
    if (userQuery.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    const user = userQuery.rows[0];

    // 3. Compare the provided password with the hashed password in the DB
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // 4. Create a JWT token (the "session")
    const payload = {
      user: {
        id: user.id,
        name: user.name
        // You can add more user data here, but not the password
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET, // Add a "JWT_SECRET=yourrandomsecretstring" to your .env file
      { expiresIn: '3h' } // Token lasts for 3 hours
    );

    // 5. Send the token to the frontend
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;