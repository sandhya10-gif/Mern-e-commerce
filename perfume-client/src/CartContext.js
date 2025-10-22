import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Add product or increase qty if already in cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ✅ Decrement product qty (if qty = 1 → remove)
  const decrementQty = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0) // remove if qty = 0
    );
  };

  // ✅ Remove item completely
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  // ✅ Clear cart after payment
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decrementQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
