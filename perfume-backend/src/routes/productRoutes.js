// routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js"; // your Mongoose model


const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ POST multiple products (bulk insert)
router.post("/bulk", async (req, res) => {
  try {
    const products = req.body; // array of products
    const inserted = await Product.insertMany(products);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
