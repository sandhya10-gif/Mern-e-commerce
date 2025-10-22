import React, { useContext } from "react";
import { WishlistContext } from "../WishlistContext";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>💖 Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p style={styles.empty}>Your wishlist is empty. Start adding favorites!</p>
      ) : (
        <>
          <div style={styles.itemsContainer}>
            {wishlistItems.map((item, index) => (
              <div key={index} style={styles.itemCard}>
                {item.image && (
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                )}
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>₹ {item.price}</p>
                </div>

                <div style={styles.buttons}>
                  <button
                    style={styles.cartButton}
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item._id);
                      navigate("/cart");
                    }}
                  >
                    Add to Cart 🛒
                  </button>

                  <button
                    style={styles.removeButton}
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.footer}>
            <button style={styles.clearButton} onClick={clearWishlist}>
              🗑 Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: "900px", margin: "30px auto", padding: "0 20px" },
  heading: { textAlign: "center", fontSize: "32px", fontWeight: "bold", marginBottom: "25px" },
  empty: { textAlign: "center", fontSize: "20px", color: "#777" },
  itemsContainer: { display: "flex", flexDirection: "column", gap: "15px" },
  itemCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px 20px",
    background: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  },
  itemImage: { width: "90px", height: "90px", objectFit: "cover", borderRadius: "10px" },
  itemDetails: { flex: 1, marginLeft: "20px" },
  itemName: { fontSize: "18px", fontWeight: "600", margin: 0 },
  itemPrice: { color: "#4CAF50", fontWeight: "bold", marginTop: "6px" },
  buttons: { display: "flex", gap: "10px" },
  cartButton: {
    background: "#2ccf03",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
  },
  removeButton: {
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
  },
  clearButton: {
    background: "#888",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: { textAlign: "right", marginTop: "20px" },
};
