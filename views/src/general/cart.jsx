import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../utilitys/cartContext";
import { NavLink, useNavigate } from "react-router-dom";
import Recommendations from "../components/Recommendations"; // fixed typo

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    subtotalAfterDiscount,
    vatAmount,
    totalWithVAT,
    coupon,
    applyCoupon,
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState(coupon);
  const [couponMessage, setCouponMessage] = useState(
    coupon
      ? `Coupon applied! ${
          subtotal > 0 ? Math.round((discount / subtotal) * 100) : 0
        }% discount.`
      : ""
  );

  const handleQuantityChange = (id, color, variantLength, delta) => {
    const item = cartItems.find(
      (i) =>
        i.id === id && i.color === color && i.variant?.length === variantLength
    );
    if (!item) return;
    updateQuantity(item.id, (item.quantity || 1) + delta);
  };

  const isInCart = (id, color, variantLength) =>
    cartItems.some(
      (i) =>
        i.id === id && i.color === color && i.variant?.length === variantLength
    );

  const handleCartClick = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleApplyCoupon = () => {
    const discountValue = applyCoupon(couponInput);
    if (discountValue > 0)
      setCouponMessage(
        `Coupon applied! ${
          subtotal > 0 ? Math.round((discountValue / subtotal) * 100) : 0
        }% discount.`
      );
    else setCouponMessage("Invalid coupon code.");
  };

  const formatPrice = (price) => `₦${Number(price || 0).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-100 via-yellow-50 to-primary-950 p-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-primary-100 mb-10 mt-32">
        Your Cart
      </h1>

      <div className="w-full max-w-7xl flex flex-col gap-10">
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
                  <div className="flex justify-start items-center gap-3">
                    {item.image && (
                      <motion.img
                        src={item.image}
                        alt={item.product_name || "Product"}
                        className="w-16 h-16 object-cover rounded-md shadow-lg"
                        whileHover={{ scale: 1.05 }}
                      />
                    )}
                    <div>
                      <h2 className="text-base font-bold text-gray-900 md:line-clamp-1 sm:line-clamp-2">
                        {item.product_name || "Unnamed Product"}
                      </h2>
                      <div className="flex flex-col sm:flex-col md:flex-row items-start md:items-center justify-start sm:gap-1 md:gap-2">
                        {item.color && (
                          <p className="text-sm text-gray-700 mt-1">
                            Color: {item.color}
                          </p>
                        )}
                        {item.variant && item.variant.length > 0 && (
                          <p className="text-sm text-gray-700">
                            Length: {item.variant.length}" inches
                          </p>
                        )}
                      </div>

                      <p className="text-primary-700 text-sm font-bold mt-1">
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
                      {(Number(item.price) || 0) * (Number(item.quantity) || 1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Checkout Summary */}
        {cartItems.length > 0 && (
          <motion.div className="w-full bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition"
              >
                Apply
              </button>
            </div>
            {couponMessage && (
              <p className="text-sm text-green-600 mb-4">{couponMessage}</p>
            )}

            <div className="mt-6 border-t border-white/30 pt-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-lg">Subtotal:</p>
                <p className="text-base font-bold text-purple-700">
                  {formatPrice(subtotal)}
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200 flex justify-between items-center">
                <p className="text-green-700 text-lg font-semibold">
                  Discount:
                </p>
                <p className="text-green-600 font-bold">
                  - {formatPrice(discount)}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-lg">VAT (7.5%):</p>
                <p className="text-base font-bold text-purple-700">
                  {formatPrice(vatAmount)}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-lg">Total:</p>
                <p className="text-4xl font-extrabold text-purple-900">
                  {formatPrice(totalWithVAT)}
                </p>
              </div>

              <NavLink
                to="/shop/check-out"
                className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-3xl shadow-xl text-center block hover:scale-105 transition-transform"
              >
                Proceed to Checkout
              </NavLink>
            </div>
          </motion.div>
        )}

        {cartItems.length > 0 && (
          <Recommendations
            handleCartClick={handleCartClick}
            isInCart={isInCart}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
