import dotenv from "dotenv";
dotenv.config(); // MUST come first

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Razorpay from "razorpay";
import Product from "./models/Product.js"; // your Mongoose product model

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // adjust frontend URL
app.use(express.json());

// ---- PRODUCTS ROUTES ----
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products from MongoDB
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("❌ Error fetching product:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ---- UPDATE PRODUCT IMAGES ----
app.put("/api/products/update-images", async (req, res) => {
  try {
    const updates = req.body; // Expecting array of {_id, image}

    if (!Array.isArray(updates)) {
      return res.status(400).json({ error: "Body must be an array" });
    }

    // Update each product image
    const results = await Promise.all(
      updates.map((u) =>
        Product.findByIdAndUpdate(u._id, { image: u.image }, { new: true })
      )
    );

    res.json({ message: "✅ All product images updated successfully", results });
  } catch (err) {
    console.error("❌ Error updating images:", err.message);
    res.status(500).json({ error: "Failed to update images" });
  }
});


// ---- RAZORPAY ROUTES ----
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys missing in .env");
  process.exit(1);
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/api/razorpay/order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: "Amount is required" });

    const options = {
      amount, // in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("❌ Razorpay order error:", err.message);
    res.status(500).json({ error: "Razorpay order failed" });
  }
});

// ⚠️ DELETE ALL PRODUCTS — use with caution
app.delete("/api/products/delete-all", async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    res.json({ message: "🗑️ All products deleted", deletedCount: result.deletedCount });
  } catch (err) {
    console.error("❌ Error deleting products:", err.message);
    res.status(500).json({ error: "Failed to delete products" });
  }
});

// ---- BULK INSERT PRODUCTS ----
app.post("/api/products/bulk", async (req, res) => {
  try {
    const products = req.body; // Expecting an array of products in JSON
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: "Request body must be an array" });
    }

    const inserted = await Product.insertMany(products);
    res.status(201).json(inserted);
  } catch (err) {
    console.error("❌ Bulk insert error:", err.message);
    res.status(500).json({ error: "Failed to insert products" });
  }
});


// ---- CONNECT MONGO & START SERVER ----
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));
