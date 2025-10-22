// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Insert multiple products
router.post("/bulk", async (req, res) => {
  try {
    const products = req.body; // the JSON array from Postman
    const inserted = await Product.insertMany(products);
    res.status(201).json(inserted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
