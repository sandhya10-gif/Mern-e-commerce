import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // backend API
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, []);

  return (
    <div className="product-container">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} width="200" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <strong>₹{product.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
