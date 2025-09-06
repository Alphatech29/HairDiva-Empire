import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../utilitys/cartContext";
import { NavLink, useNavigate } from "react-router-dom";
import Recommendations from "../componenets/Recommendations";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, total } =
    useCart();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  // Handles quantity change for items considering id, color, and variant length
  const handleQuantityChange = (id, color, variantLength, delta) => {
    const item = cartItems.find(
      (i) =>
        i.id === id && i.color === color && i.variant?.length === variantLength
    );
    if (!item) return;
    updateQuantity(item.id, (item.quantity || 1) + delta, color, variantLength);
  };

  // Check if an item exists in cart
  const isInCart = (id, color, variantLength) =>
    cartItems.some(
      (i) =>
        i.id === id && i.color === color && i.variant?.length === variantLength
    );

  // Add item to cart
  const handleCartClick = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  // Apply coupon code
  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "DISCOUNT10") {
      const discountValue = total * 0.1; // 10% discount
      setDiscount(discountValue);
      setCouponMessage("Coupon applied! 10% discount.");
    } else if (code === "DISCOUNT20") {
      const discountValue = total * 0.2; // 20% discount
      setDiscount(discountValue);
      setCouponMessage("Coupon applied! 20% discount.");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  // Format price to ₦ with commas
  const formatPrice = (price) => `₦${Number(price || 0).toLocaleString()}`;

  // VAT calculation (e.g., 7.5%)
  const VAT_PERCENT = 0.075;
  const subtotalAfterDiscount = total - discount;
  const vatAmount = subtotalAfterDiscount * VAT_PERCENT;
  const totalWithVAT = subtotalAfterDiscount + vatAmount;

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-100 via-yellow-50 to-primary-950 p-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-primary-100 mb-10 mt-32">
        Your Cart
      </h1>

      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1 space-y-2">
          {cartItems.length === 0 ? (
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-10 text-center text-primary-950 font-semibold text-xl shadow-md flex flex-col items-center gap-4">
              <p>Your cart is empty </p>
              <p>Add some products to continue!</p>
              <motion.button
                onClick={() => navigate("/shop")}
                className="px-6 py-3 bg-primary-500 text-white font-bold rounded-3xl shadow-lg hover:bg-yellow-600 transition"
                whileTap={{ scale: 0.95 }}
              >
                Go to Shop
              </motion.button>
            </div>
          ) : (
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.id}-${item.color || "default"}-${
                    item.variant?.length || "default"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -150 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/20 backdrop-blur-lg rounded-md p-6 flex items-center justify-between shadow-xl hover:shadow-2xl border border-white/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <motion.img
                        src={item.image}
                        alt={item.product_name || "Product"}
                        className="w-16 h-16 object-cover rounded-md shadow-lg"
                        whileHover={{ scale: 1.05 }}
                      />
                    )}
                    <div>
                      <h2 className="text-base font-bold text-gray-900 md:line-clamp-1 sm:line-clamp-1">
                        {item.product_name || "Unnamed Product"}
                      </h2>
                      <div className="flex items-center gap-3">
                        {item.color && (
                          <p className="text-sm text-gray-700 mt-1">
                            Color: {item.color}
                          </p>
                        )}
                        {item.variant?.length && (
                          <p className="text-sm text-gray-700">
                            Length: {item.variant.length}" inches
                          </p>
                        )}
                      </div>

                      <p className="text-purple-600 text-sm font-bold mt-1">
                        {formatPrice(item.price)}
                      </p>

                      <div className="flex items-center mt-3 space-x-3">
                        <motion.button
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.color,
                              item.variant?.length,
                              -1
                            )
                          }
                          className="px-4 py-1 bg-purple-200/70 rounded-lg font-bold hover:bg-purple-300 transition"
                          whileTap={{ scale: 0.9 }}
                        >
                          -
                        </motion.button>
                        <span className="font-medium text-lg">
                          {item.quantity || 1}
                        </span>
                        <motion.button
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.color,
                              item.variant?.length,
                              1
                            )
                          }
                          className="px-4 py-1 bg-purple-200/70 rounded-lg font-bold hover:bg-purple-300 transition"
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <motion.button
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.color,
                          item.variant?.length
                        )
                      }
                      className="text-red-500 hover:text-red-700 mb-4 transition"
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiTrash2 size={26} />
                    </motion.button>
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(
                        Number(item.price) * Number(item.quantity || 1)
                      )}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Recommendations */}
          {cartItems.length > 0 && (
            <Recommendations
              handleCartClick={handleCartClick}
              isInCart={isInCart}
            />
          )}
        </div>

        {/* Checkout Summary */}
        {cartItems.length > 0 && (
          <motion.div className="flex-shrink-0 w-full md:w-96 bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl sticky top-6 border border-white/30">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Coupon Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition"
              >
                Apply
              </button>
            </div>
            {couponMessage && (
              <p className="text-sm text-green-600 mb-4">{couponMessage}</p>
            )}

            <div className="mt-6 border-t border-white/30 pt-4 flex flex-col gap-3">
              <div className="mt-6 border-t border-white/30 pt-4 flex flex-col gap-3">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-lg">Subtotal:</p>
                  <p className="text-base font-bold text-purple-700">
                    {formatPrice(total)}
                  </p>
                </div>

                {/* Discount Section */}
                <div className="bg-green-50 p-3 rounded-lg border border-green-200 flex justify-between items-center">
                  <p className="text-green-700 text-lg font-semibold">
                    Discount:
                  </p>
                  <p className="text-green-600 font-bold">
                    - {formatPrice(discount)}
                  </p>
                </div>

                {/* VAT */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-lg">VAT (7.5%):</p>
                  <p className="text-base font-bold text-purple-700">
                    {formatPrice(vatAmount)}
                  </p>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-lg">Total:</p>
                  <p className="text-4xl font-extrabold text-purple-900">
                    {formatPrice(totalWithVAT)}
                  </p>
                </div>
              </div>

              <NavLink
                to="/shop/check-out"
                className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-3xl shadow-xl text-center block hover:scale-105 transition-transform"
              >
                Checkout Now
              </NavLink>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
