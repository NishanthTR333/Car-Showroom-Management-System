const express = require('express');
const router = express.Router();
const db = require('../db'); // Imports your db.js connection

//=========================================================
// REPLACES: All 'brand/*.php' files (audi.php, bmw.php, etc.)
//=========================================================
router.get('/', async (req, res) => {
  try {
    const { brand } = req.query; // e.g., /api/cars?brand=BMW

    let queryText = "SELECT * FROM carss";
    let queryParams = [];

    if (brand) {
      queryText += " WHERE brand = $1";
      queryParams.push(brand.toUpperCase());
    }
    
    const { rows } = await db.query(queryText, queryParams);
    res.json(rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//=========================================================
// REPLACES: admin/addcar.php
//=========================================================
// TODO: This route should be "protected" so only admins can access it.
// This is a next step after you have admin login working.
router.post('/', async (req, res) => {
  try {
    // 1. Get car data from request body
    const { name, brand, price, fuel, img, availcars } = req.body;

    // 2. Create the image path.
    // Your old code constructs the path.
    // Let's assume the frontend sends the full path or just the filename.
    // For now, we'll just trust the 'img' path from the request.
    
    // 3. Insert into database
    const newCar = await db.query(
      "INSERT INTO carss (name, brand, price, fuel, img, availcars) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, brand, price, fuel, img, availcars]
    );

    res.status(201).json(newCar.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;