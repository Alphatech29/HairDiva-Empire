import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "cartItems") {
        setCartItems(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Normalize product before adding
  const normalizeProduct = (product) => {
    return {
      ...product,
      price: Number(product.price) || 0,       // ensure price is number
      quantity: Number(product.quantity) || 1, // ensure quantity is number
    };
  };

  // Add item or increase quantity
  const addToCart = (product) => {
    const normalized = normalizeProduct(product);

    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === normalized.id);
      if (exists) {
        return prev.map((item) =>
          item.id === normalized.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + (normalized.quantity || 1),
              }
            : item
        );
      }
      return [...prev, normalized];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Number(quantity) || 1) }
          : item
      )
    );
  };

  const total = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return acc + price * qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
