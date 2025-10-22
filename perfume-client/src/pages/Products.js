// src/pages/Products.js
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Products({ searchTerm: parentSearchTerm }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(parentSearchTerm || "");
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Update search term if URL has query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");
    if (query) setSearchTerm(query);
  }, [location.search]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "30px auto",
      padding: "0 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "40px",
      color: "#222",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "25px",
    },
    card: {
      borderRadius: "15px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
      backgroundColor: "#fff",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
    },
    imageWrapper: {
      width: "100%",
      height: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9f9f9",
      borderRadius: "12px",
      marginBottom: "15px",
      overflow: "hidden",
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
    },
    name: {
      fontSize: "20px",
      fontWeight: "600",
      margin: "10px 0 8px 0",
      color: "#333",
      textDecoration: "none",
    },
    price: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#2e8b57",
      marginBottom: "10px",
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>✨ Our Products ✨</h1>
      <div style={styles.grid}>
        {filteredProducts.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`} style={styles.link}>
            <div
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = styles.cardHover.transform;
                e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = styles.card.boxShadow;
              }}
            >
              <div style={styles.imageWrapper}>
                {product.image && (
                  <img src={product.image} alt={product.name} style={styles.image} />
                )}
              </div>
              <h3 style={styles.name}>{product.name}</h3>
              <p style={styles.price}>₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
