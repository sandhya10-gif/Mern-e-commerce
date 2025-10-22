import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // ✅ Add item to wishlist (prevent duplicates)
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  // ✅ Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item._id !== productId)
    );
  };

  // ✅ Clear all
  const clearWishlist = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
