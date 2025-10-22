import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { WishlistContext } from "../WishlistContext";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const decrementQty = (productId) => {
    const item = cartItems.find((i) => i._id === productId);
    if (item.qty > 1) {
      const updated = cartItems.map((i) =>
        i._id === productId ? { ...i, qty: i.qty - 1 } : i
      );
      removeFromCart(productId);
      updated.forEach((i) => addToCart(i));
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty. Start shopping!</p>
      ) : (
        <>
          <div style={styles.itemsContainer}>
            {cartItems.map((item, index) => (
              <div
                key={index}
                style={styles.itemCard}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)")
                }
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.itemImage}
                  />
                )}

                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>₹ {item.price}</p>

                  <div style={styles.qtyControls}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => decrementQty(item._id)}
                    >
                      -
                    </button>
                    <span style={styles.qtyText}>{item.qty}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>

                    {/* ✅ Wishlist button fixed */}
                    <button
                      onClick={() => addToWishlist(item)}
                      style={{
                        background: "#ff4081",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      ❤️ Add to Wishlist
                    </button>
                  </div>
                </div>

                <button
                  style={styles.removeButton}
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h3 style={styles.totalText}>
              Total: <span style={styles.totalAmount}>₹{totalAmount}</span>
            </h3>
            <div style={styles.actions}>
              <button
                style={{
                  ...styles.checkoutButton,
                  cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
                  opacity: cartItems.length === 0 ? 0.5 : 1,
                }}
                onClick={() => navigate("/checkout")}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
              <button style={styles.clearButton} onClick={clearCart}>
                🗑 Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "30px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#222",
  },
  empty: {
    textAlign: "center",
    fontSize: "20px",
    color: "#777",
    marginTop: "40px",
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  itemCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px 20px",
    background: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  },
  itemImage: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "10px",
    marginRight: "20px",
  },
  itemDetails: { flex: 1 },
  itemName: {
    fontSize: "18px",
    margin: 0,
    fontWeight: "600",
    color: "#333",
  },
  itemPrice: {
    fontSize: "16px",
    color: "#4CAF50",
    marginTop: "6px",
    fontWeight: "bold",
  },
  qtyControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px",
  },
  qtyBtn: {
    background: "#e5e7eb",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    fontSize: "16px",
    cursor: "pointer",
  },
  qtyText: {
    minWidth: "24px",
    textAlign: "center",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.2s",
  },
  summary: { marginTop: "40px", textAlign: "right" },
  totalText: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "15px",
  },
  totalAmount: {
    color: "#E91E63",
    fontSize: "24px",
    fontWeight: "700",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "10px",
  },
  checkoutButton: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "12px 22px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "background 0.2s",
  },
  clearButton: {
    backgroundColor: "#888",
    color: "#fff",
    padding: "12px 22px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

export default CartPage;
