import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";

const recommendations = [
  {
    id: 101,
    name: "Smart Glasses",
    price: 150,
    image: "/image/hair-1.jpg",
    rating: 4,
    sold: 120,
    tag: "New",
  },
  {
    id: 102,
    name: "Leather Wallet",
    price: 90,
    image: "/image/hair-2.jpg",
    rating: 5,
    sold: 80,
  },
  {
    id: 103,
    name: "Sleek Backpack",
    price: 120,
    image: "/image/hair-3.jpg",
    rating: 3,
    sold: 45,
    tag: "Hot",
  },
];

const Recommendations = ({ handleCartClick, isInCart }) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        You might also like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommendations.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all relative"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                {product.tag}
              </span>
            )}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) =>
                  i < Math.floor(product.rating) ? (
                    <FaStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="text-yellow-300/60" />
                  )
                )}
                <span className="text-gray-400 text-sm">
                  ({product.sold})
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-purple-700 text-lg">
                  {product.price}
                </span>
                <motion.button
                  onClick={() => handleCartClick(product)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    isInCart(product.id)
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-pink-400 text-white hover:bg-pink-500"
                  } flex items-center gap-2`}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaShoppingCart />{" "}
                  {isInCart(product.id) ? "Added" : "Add"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
