import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { WishlistContext } from "../WishlistContext"; // ❤️ import wishlist context
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, decrementQty } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext); // ❤️ use wishlist
  const [added, setAdded] = useState(false);

  const inCart = cartItems.find((item) => item._id === product._id);
  const inWishlist = wishlistItems.some((item) => item._id === product._id); // ❤️ check wishlist

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const toggleWishlist = () => { // ❤️ toggle wishlist logic
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const styles = {
    card: {
      borderRadius: "16px",
      padding: "16px",
      width: "220px",
      background: "linear-gradient(145deg, #ffffff, #f0f4f9)",
      boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
      textAlign: "center",
      position: "relative",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    },
    image: {
      width: "100%",
      height: "160px",
      objectFit: "cover",
      borderRadius: "12px",
      transition: "transform 0.3s ease",
    },
    name: {
      fontSize: "18px",
      margin: "12px 0",
      color: "#111",
      fontWeight: "600",
      textDecoration: "none",
    },
    price: {
      fontSize: "17px",
      color: "#0074D9",
      fontWeight: "bold",
    },
    button: {
      marginTop: "10px",
      padding: "10px 14px",
      background: "linear-gradient(90deg, #001f3f, #0fe54fff)",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      fontWeight: "500",
      fontSize: "14px",
      transition: "all 0.3s ease",
    },
    buyNow: {
      background: "linear-gradient(90deg, #121b15ff, #e2660dff)",
      marginTop: "8px",
    },
    wishlistBtn: { // ❤️ new wishlist button style
      marginTop: "8px",
      padding: "8px 10px",
      background: "none",
      border: "1px solid #ddd",
      borderRadius: "50%",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: "20px",
      color: inWishlist ? "red" : "#aaa",
    },
    qtyControls: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "10px",
    },
    qtyBtn: {
      background: "#0074D9",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "6px 12px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
      transition: "all 0.2s ease",
    },
    qtyText: {
      fontSize: "16px",
      fontWeight: "600",
    },
    addedBadge: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "#22c55e",
      color: "white",
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: "bold",
      animation: "fadeInOut 1.2s ease",
    },
  };

  // Hover states
  const [hover, setHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [buyHover, setBuyHover] = useState(false);

  return (
    <div
      style={{ ...styles.card, ...(hover ? styles.cardHover : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            ...styles.image,
            transform: hover ? "scale(1.05)" : "scale(1)",
          }}
        />
        <h3 style={styles.name}>{product.name}</h3>
      </Link>

      <p style={styles.price}>₹ {product.price}</p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          marginTop: "12px",
        }}
      >
        {/* 🛒 Cart buttons */}
        {inCart ? (
          <div style={styles.qtyControls}>
            <button
              style={styles.qtyBtn}
              onClick={() => decrementQty(product._id)}
            >
              -
            </button>
            <span style={styles.qtyText}>{inCart.qty}</span>
            <button style={styles.qtyBtn} onClick={() => addToCart(product)}>
              +
            </button>
          </div>
        ) : (
          <button
            style={{ ...styles.button, ...(btnHover ? styles.buttonHover : {}) }}
            onClick={handleAdd}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            <FaShoppingCart /> Add
          </button>
        )}

        {/* 🛍️ Buy Now */}
        <button
          style={{
            ...styles.button,
            ...styles.buyNow,
            ...(buyHover
              ? {
                  background: "linear-gradient(90deg, #15803d, #16a34a)",
                  transform: "scale(1.05)",
                }
              : {}),
          }}
          onClick={() =>
            (window.location.href = `/checkout?productId=${product._id}`)
          }
          onMouseEnter={() => setBuyHover(true)}
          onMouseLeave={() => setBuyHover(false)}
        >
          Buy Now
        </button>

        {/* ❤️ Wishlist toggle */}
        <button
          onClick={toggleWishlist}
          style={styles.wishlistBtn}
          title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <FaHeart />
        </button>
      </div>

      {/* ✓ Added badge */}
      {added && <div style={styles.addedBadge}>✓ Added</div>}
    </div>
  );
};

export default ProductCard;
