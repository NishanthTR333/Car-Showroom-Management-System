const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config(); // Make sure this is at the top

// Middleware
app.use(cors());
app.use(express.json());

// --- API Routes ---
// Any request to /api/auth will be handled by your auth.js file
app.use("/api/auth", require("./routes/auth"));

// Any request to /api/cars will be handled by your cars.js file
app.use("/api/cars", require("./routes/cars"));

// Any request to /api/orders will be handled by your orders.js file
app.use("/api/orders", require("./routes/orders"));
// --- End Routes ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});