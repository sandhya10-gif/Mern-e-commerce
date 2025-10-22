import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

// Create Razorpay order
router.post("/order", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount, // amount in paise (100 INR = 10000)
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    res.json(order);   // ✅ send JSON back
  } catch (err) {
    console.error("Razorpay Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
