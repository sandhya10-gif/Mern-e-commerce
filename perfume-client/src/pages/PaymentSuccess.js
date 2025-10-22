import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#4CAF50" }}>Payment Successful ✅</h1>
      <p>Thank you for your purchase! Your order has been confirmed.</p>
      <Link to="/">
        <button
          style={{
            marginTop: "20px",
            backgroundColor: "#3399cc",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
