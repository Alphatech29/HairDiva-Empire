import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../utilitys/cartContext";
import { useNavigate } from "react-router-dom"; // Make sure you use React Router

const recommendations = [
  { id: 101, name: "Smart Glasses", price: 150, image: "/image/hair-1.jpg", rating: 4, sold: 120, tag: "New" },
  { id: 102, name: "Leather Wallet", price: 90, image: "/image/hair-2.jpg", rating: 5, sold: 80 },
  { id: 103, name: "Sleek Backpack", price: 120, image: "/image/hair-3.jpg", rating: 3, sold: 45, tag: "Hot" },
];

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    updateQuantity(id, (item.quantity || 1) + delta);
  };

  const isInCart = (id) => cartItems.some(item => item.id === id);

  const handleCartClick = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleCheckout = () => alert("Proceeding to Checkout...");

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-100 via-yellow-50 to-primary-950 p-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-primary-100 mb-10 mt-32 tracking-widest animate-pulse">Your Cart</h1>

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
              {cartItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -150 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/20 backdrop-blur-lg rounded-md p-6 flex items-center justify-between shadow-xl hover:shadow-2xl border border-white/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div>
                      <h2 className="text-base font-bold text-gray-900 md:line-clamp-1 sm:line-clamp-1">{item.name}</h2>
                      <p className="text-purple-600 text-sm font-bold mt-1">{item.price}</p>
                      <div className="flex items-center mt-3 space-x-3">
                        <motion.button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="px-4 py-1 bg-purple-200/70 rounded-lg font-bold hover:bg-purple-300 transition"
                          whileTap={{ scale: 0.9 }}
                        >
                          -
                        </motion.button>
                        <span className="font-medium text-lg">{item.quantity || 1}</span>
                        <motion.button
                          onClick={() => handleQuantityChange(item.id, 1)}
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
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 mb-4 transition"
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiTrash2 size={26} />
                    </motion.button>
                    <span className="text-xl font-bold text-gray-900">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Recommendations – only show if cart has items */}
          {cartItems.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recommendations.map(product => (
                  <motion.div
                    key={product.id}
                    className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    {product.tag && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                        {product.tag}
                      </span>
                    )}
                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) =>
                          i < Math.floor(product.rating) ? (
                            <FaStar key={i} className="text-yellow-400" />
                          ) : (
                            <FaRegStar key={i} className="text-yellow-300/60" />
                          )
                        )}
                        <span className="text-gray-400 text-sm">({product.sold})</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-purple-700 text-lg">${product.price}</span>
                        <motion.button
                          onClick={() => handleCartClick(product)}
                          className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                            isInCart(product.id)
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-pink-400 text-white hover:bg-pink-500"
                          } flex items-center gap-2`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaShoppingCart /> {isInCart(product.id) ? "Added" : "Add"}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Checkout Summary – only show if cart has items */}
        {cartItems.length > 0 && (
          <motion.div className="flex-shrink-0 w-full md:w-96 bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl sticky top-6 border border-white/30">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="mt-6 border-t border-white/30 pt-4 flex flex-col gap-4">
              <p className="text-gray-500 text-lg">Total:</p>
              <p className="text-4xl font-extrabold text-purple-700">${total.toFixed(2)}</p>
              <motion.button
                onClick={handleCheckout}
                className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-3xl shadow-xl hover:scale-105 transition-transform"
                whileTap={{ scale: 0.95 }}
              >
                Checkout Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
