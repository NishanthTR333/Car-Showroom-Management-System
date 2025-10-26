const express = require('express');
const router = express.Router();
const db = require('../db');

//=========================================================
// REPLACES: book/book1.php
//=========================================================
// TODO: This route should be "protected" so only logged-in users can book.
router.post('/', async (req, res) => {
  try {
    // 1. Get data from frontend
    // The user ID should come from their JWT token, not the request body,
    // but for simplicity, we'll take it from req.body for now.
    const { userId, carName, transactionId } = req.body;

    // 2. Get user details from DB
    // Your old code does this
    const userQuery = await db.query("SELECT * FROM \"user\" WHERE id = $1", [userId]);
    if (userQuery.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    const user = userQuery.rows[0];

    // 3. Insert the order
    const newOrder = await db.query(
      "INSERT INTO orders (name, pno, mail, tid, cname, success, canceled) VALUES ($1, $2, $3, $4, $5, 0, 0) RETURNING *",
      [user.name, user.phoneno, user.mail, transactionId, carName]
    );

    res.status(201).json(newOrder.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;