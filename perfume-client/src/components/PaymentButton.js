import React from "react";
import axios from "axios";

const PaymentButton = () => {
  const handlePayment = async () => {
    try {
      // 1️⃣ Call backend to create order
      const { data: order } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: 500 } // amount in INR
      );

      // 2️⃣ Configure Razorpay options
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // replace with your key_id
        amount: order.amount,
        currency: order.currency,
        name: "Electromart",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        theme: { color: "#3399cc" },
      };

      // 3️⃣ Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;
