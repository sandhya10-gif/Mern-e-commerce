// src/pages/ProductDetail.js
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext"; // ✅ import cart context

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext); // ✅ get addToCart

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Product Image */}
        {product.image && (
          <div style={styles.imageWrapper}>
            <img src={product.image} alt={product.name} style={styles.image} />
          </div>
        )}

        {/* Info Section */}
        <div style={styles.details}>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.price}>₹{product.price}</p>
          <p style={styles.description}>{product.description}</p>

          {/* Buttons */}
          <div style={styles.actions}>
            <button
              style={styles.cartBtn}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#a50606")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#cd0808ff")
              }
              onClick={() => addToCart(product)} // ✅ real cart update
            >
              Add to Cart
            </button>

            <button
              style={styles.buyBtn}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#218838")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#28a745")
              }
              onClick={() =>
                navigate(`/checkout?productId=${product._id}`)
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    padding: "0 20px",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "1000px",
    width: "100%",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  imageWrapper: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "400px",
    objectFit: "contain",
  },
  details: {
    flex: "1",
    padding: "25px",
    textAlign: "left",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  price: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#cd3a3aff",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "25px",
  },
  actions: {
    display: "flex",
    gap: "15px",
  },
  cartBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#cd0808ff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buyBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#33cb18ff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default ProductDetail;
