import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [coupon, setCoupon] = useState(() => localStorage.getItem("coupon") || "");
  const [discount, setDiscount] = useState(() => {
    const storedDiscount = localStorage.getItem("discount");
    return storedDiscount ? Number(storedDiscount) : 0;
  });

  // Persist cartItems
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Clear coupon & discount if cart is empty
    if (cartItems.length === 0) {
      setCoupon("");
      setDiscount(0);
      localStorage.removeItem("coupon");
      localStorage.removeItem("discount");
    }
  }, [cartItems]);

  // Persist coupon & discount
  useEffect(() => {
    localStorage.setItem("coupon", coupon);
    localStorage.setItem("discount", discount);
  }, [coupon, discount]);

  const normalizeProduct = (product) => ({
    ...product,
    price: Number(product.price) || 0,
    quantity: Number(product.quantity) || 1,
    barcode: product.barcode || null,
  });

  // Add to cart
  const addToCart = (product) => {
    const normalized = normalizeProduct(product);
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === normalized.id);
      if (exists) {
        return prev.map((item) =>
          item.id === normalized.id
            ? { ...item, quantity: (item.quantity || 1) + normalized.quantity }
            : item
        );
      }
      return [...prev, normalized];
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove multiple items
  const removeMultipleFromCart = (ids) => {
    setCartItems((prev) => prev.filter((item) => !ids.includes(item.id)));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    setCoupon("");
    setDiscount(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("coupon");
    localStorage.removeItem("discount");
  };

  // Subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Apply coupon
  const applyCoupon = (code) => {
    const upperCode = code.trim().toUpperCase();
    let discountValue = 0;

    if (upperCode === "DISCOUNT10") discountValue = subtotal * 0.1;
    else if (upperCode === "DISCOUNT20") discountValue = subtotal * 0.2;

    setCoupon(upperCode);
    setDiscount(discountValue);

    return discountValue;
  };

  const VAT_PERCENT = 0.075;
  const subtotalAfterDiscount = subtotal - discount;
  const vatAmount = subtotalAfterDiscount * VAT_PERCENT;
  const totalWithVAT = subtotalAfterDiscount + vatAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        removeMultipleFromCart,
        clearCart, 
        subtotal,
        discount,
        coupon,
        subtotalAfterDiscount,
        vatAmount,
        totalWithVAT,
        applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
