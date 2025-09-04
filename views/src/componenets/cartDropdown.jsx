import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdCancel } from "react-icons/md";
import { useCart } from "../utilitys/cartContext";

export default function CartDropdown({ onClose }) {
  const { cartItems, removeFromCart, total } = useCart();

  const formatPrice = (price) => {
    let value = 0;
    if (typeof price === "string") {
      value = Number(price.replace(/[^0-9.]/g, "")) || 0;
    } else if (typeof price === "number") {
      value = price;
    }
    return `₦${value.toLocaleString("en-US")}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute right-0 mt-3 sm:w-80 bg-white shadow-xl rounded-xl p-5 text-sm z-50"
      >
        <h3 className="font-bold text-gray-900 text-lg mb-4">Your Shopping Cart</h3>

        {/* Items */}
        <div className="space-y-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3 last:border-none"
              >
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 line-clamp-1">{item.name}</span>
                    <span className="font-semibold text-sm text-gray-900">
                    {formatPrice(item.price)}
                  </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition text-xl"
                  >
                    <MdCancel />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-10">Your cart is empty</p>
          )}
        </div>

        {/* Total */}
        {cartItems.length > 0 && (
          <>
            <hr className="my-4 border-gray-200" />
            <div className="flex justify-between font-bold text-gray-900 text-base mb-4">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>

            <NavLink
              to="/cart"
              className="block text-center bg-primary-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-primary-700 transition duration-300"
              onClick={onClose}
            >
              View Cart
            </NavLink>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
