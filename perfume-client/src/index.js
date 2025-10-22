import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext"; // ✅ Import wishlist context
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <WishlistProvider> {/* ✅ Wrap App with WishlistProvider */}
      <App />
    </WishlistProvider>
  </CartProvider>
);
