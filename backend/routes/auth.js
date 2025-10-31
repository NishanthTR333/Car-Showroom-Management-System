const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();

router.post('/register', async (req, res) => {
  try {
    
    const { id, name, pass, dob, mob, yob, phoneno, mail } = req.body;

    
    const userCheck = await db.query("SELECT * FROM \"user\" WHERE id = $1 OR mail = $2", [id, mail]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Username or email already exists." });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    
    const newUser = await db.query(
      "INSERT INTO \"user\" (id, name, pass, phoneno, mail) VALUES ($1, $2, $3, $4, $5) RETURNING id, name",
      [id, name, hashedPassword, phoneno, mail]
    );

    
    res.status(201).json({
      message: "User registered successfully!",
      user: newUser.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



router.post('/login', async (req, res) => {
  try {
    
    const { id, pass } = req.body;

    
    const userQuery = await db.query("SELECT * FROM \"user\" WHERE id = $1", [id]);
    if (userQuery.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    const user = userQuery.rows[0];

   
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    
    const payload = {
      user: {
        id: user.id,
        name: user.name
        
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET, 
      { expiresIn: '3h' } 
    );

    
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
