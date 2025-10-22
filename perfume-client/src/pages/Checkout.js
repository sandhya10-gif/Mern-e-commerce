import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import { useLocation } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [productsToCheckout, setProductsToCheckout] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("productId");

    if (cartItems.length > 0) {
      setProductsToCheckout(cartItems);
    } else if (productId) {
      fetch(`http://localhost:5000/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => setProductsToCheckout([{ ...data, qty: 1 }]))
        .catch((err) => console.error("❌ Error fetching product:", err));
    }
  }, [cartItems, location.search]);

  const totalAmount = productsToCheckout.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  if (productsToCheckout.length === 0) {
    return <h2 style={styles.empty}>🛒 Your cart is empty</h2>;
  }

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      });

      const order = await response.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "LeafOra",
        description: "Order Payment",
        order_id: order.id,
        handler: function (response) {
          alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
          clearCart();
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9876543210",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("❌ Payment failed, try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>💳 Checkout</h2>

      <div style={styles.itemsContainer}>
        {productsToCheckout.map((item) => (
          <div
            key={item._id || item.id}
            style={styles.itemCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)")
            }
          >
            {item.image && (
              <img src={item.image} alt={item.name} style={styles.itemImage} />
            )}
            <div style={styles.itemDetails}>
              <h3 style={styles.itemName}>{item.name}</h3>
              <p style={styles.itemQty}>Qty: {item.qty || 1}</p>
            </div>
            <p style={styles.itemPrice}>₹{item.price * (item.qty || 1)}</p>
          </div>
        ))}
      </div>

      <h3 style={styles.total}>
        Total: <span style={styles.totalAmount}>₹{totalAmount}</span>
      </h3>

      <button
        style={styles.payButton}
        onMouseEnter={(e) => (e.target.style.background = "#388e3c")}
        onMouseLeave={(e) => (e.target.style.background = "#4CAF50")}
        onClick={handlePayment}
      >
        ⚡ Pay with Razorpay
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#222",
  },
  empty: {
    textAlign: "center",
    fontSize: "20px",
    color: "#777",
    marginTop: "50px",
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "25px",
  },
  itemCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "15px 20px",
    background: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  },
  itemImage: {
    width: "85px",
    height: "85px",
    objectFit: "cover",
    borderRadius: "10px",
    marginRight: "18px",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: "18px",
    margin: 0,
    fontWeight: "600",
    color: "#333",
  },
  itemQty: {
    fontSize: "14px",
    color: "#555",
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#4CAF50",
    minWidth: "80px",
    textAlign: "right",
  },
  total: {
    textAlign: "right",
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  totalAmount: {
    color: "#E91E63",
    fontSize: "24px",
    fontWeight: "700",
  },
  payButton: {
    display: "block",
    margin: "0 auto",
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "14px 28px",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
  },
};

export default Checkout;
