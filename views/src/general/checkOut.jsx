import React from "react";
import { useCart } from "../utilitys/cartContext";
import { NavLink } from "react-router-dom";

const Checkout = () => {
  const { cartItems, total, discount, updateQuantity, removeFromCart } = useCart();

  const VAT_PERCENT = 0.075;
  const subtotalAfterDiscount = total - discount;
  const vatAmount = subtotalAfterDiscount * VAT_PERCENT;
  const totalWithVAT = subtotalAfterDiscount + vatAmount;

  const formatPrice = (price) => `₦${Number(price || 0).toLocaleString()}`;

  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    updateQuantity(id, (item.quantity || 1) + delta);
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-100 via-yellow-50 to-primary-950 p-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-primary-100 mb-10 mt-16">
        Checkout
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white/20 w-full backdrop-blur-lg rounded-3xl p-10 text-center text-primary-950 font-semibold text-xl shadow-md flex flex-col items-center gap-4">
          <p>Your cart is empty.</p>
          <NavLink
            to="/shop"
            className="px-6 py-3 bg-primary-500 text-white font-bold rounded-3xl shadow-lg hover:bg-yellow-600 transition"
          >
            Go to Shop
          </NavLink>
        </div>
      ) : (
        <div className="w-full max-w-6xl bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30 flex flex-col md:flex-row gap-8">

          {/* Left Column: Customer Info */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Customer Info</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <h2 className="text-2xl font-bold text-gray-900 mt-6">Shipping Address</h2>
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="State"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full md:w-96 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-white/30 pb-3"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded-md shadow"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{item.product_name}</span>

                      {/* Color & Variant */}
                      <div className="flex items-center gap-2 mt-1">
                        {item.color && (
                          <span className="px-2 py-1 rounded-full text-white text-xs" style={{ backgroundColor: item.color }}>
                            {item.color}
                          </span>
                        )}
                        {item.variant?.length && (
                          <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs">
                            {item.variant.length}""
                          </span>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="px-3 py-1 bg-purple-200/70 rounded-lg font-bold hover:bg-purple-300 transition"
                        >
                          -
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="px-3 py-1 bg-purple-200/70 rounded-lg font-bold hover:bg-purple-300 transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700 transition"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>

                  <span className="font-bold text-gray-900">
                    ₦{Number(item.price * (item.quantity || 1)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 border-t border-white/30 pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-gray-700 font-semibold">
                <span>Subtotal:</span>
                <span>{formatPrice(total)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Discount:</span>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-700 font-semibold">
                <span>VAT (7.5%):</span>
                <span>{formatPrice(vatAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold text-xl">
                <span>Total:</span>
                <span>{formatPrice(totalWithVAT)}</span>
              </div>
            </div>

            <NavLink
              to="/payment"
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-3xl shadow-xl text-center hover:scale-105 transition-transform"
            >
              Proceed to Payment
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
