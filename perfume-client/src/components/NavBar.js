// src/components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { FaSearch } from "react-icons/fa";
import { WishlistContext } from "../WishlistContext"; // ✅ new import


// ✅ Import Google Font in JS
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

export default function Navbar({ searchTerm, setSearchTerm }) {
  const { cartItems } = useContext(CartContext) || {};
  const cartCount = cartItems ? cartItems.length : 0;
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };
  const { wishlistItems } = useContext(WishlistContext) || {};
const wishlistCount = wishlistItems ? wishlistItems.length : 0;


  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .nav-link {
          color: white;
          text-decoration: none;
          position: relative;
          font-size: 16px;
          padding: 6px 10px;
          border-radius: 5px;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .nav-link:hover {
          background: #0074D9; 
          color: white;
        }
        .nav-btn {
          background-color:  #2ccf03ff;
          color: white;
          border: none;
          padding: 6px 12px;
          cursor: pointer;
          border-radius: 5px;
          font-size: 14px;
          transition: background 0.3s ease;
        }
        .nav-btn:hover {
          background: #e60000;
        }
        .search-btn:hover {
          background: #005fa3;
        }
      `}</style>

      <nav style={styles.nav}>
        <h2 style={styles.logo}>
          <span style={styles.electro}>Leaf</span>
          <span style={styles.mart}>Ora</span>
        </h2>

        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="px-4 py-2 border rounded-lg w-full text-blue-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

          <button type="submit" style={styles.searchBtn} className="search-btn">
            <FaSearch />
          </button>
        </form>

        <div style={styles.links}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/wishlist" className="nav-link">
  Wishlist {wishlistCount > 0 && <span style={styles.badge}>{wishlistCount}</span>}
</Link>

          <Link to="/cart" className="nav-link">
            Cart {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>
          
          <Link to="/checkout" className="nav-link">Checkout</Link>
          <button onClick={handleLogout} className="nav-btn">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 25px",
    background: "#111416ff", 
    color: "white",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(12, 10, 10, 0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontFamily: "'Orbitron', sans-serif", // ✅ New font
    letterSpacing: "1px",
  },
  electro: {
    color: "#f9fafaff", 
  },
  mart: {
    color: "#2ccf03ff", 
  },
  links: { display: "flex", gap: "18px", alignItems: "center" },
  badge: {
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "2px 8px",
    fontSize: "12px",
    marginLeft: "4px",
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    marginRight: "15px",
    flex: 1,
    maxWidth: "300px",
    border: "2px solid #dbdfe3ff",
  },
  searchInput: { 
    border: "none", 
    padding: "8px 12px", 
    width: "100%", 
    outline: "none", 
    fontSize: "14px" 
  },
  searchBtn: { 
    backgroundColor: "#040405ff", 
    color: "white", 
    borderRadius: "10px", 
    padding: "8px 12px", 
    cursor: "pointer",
    transition: "background 0.3s ease"
  },
};
