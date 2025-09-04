import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { useCart } from "../utilitys/cartContext";

const products = [
  { id: 1, name: "Luxury Straight Wig", category: "Wigs", price: "₦250,000", oldPrice: "₦300,000", sold: "1.2K+ sold", rating: 4.8, image: "/image/hair-1.jpg", tag: "Hot" },
  { id: 2, name: "Curly Diva Hair", category: "Luxury Hair", price: "₦320,000", oldPrice: "₦400,000", sold: "900+ sold", rating: 4.7, image: "/image/hair-2.jpg", tag: "New" },
  { id: 3, name: "Hair Styling Package", category: "Styling", price: "₦80,000", oldPrice: "₦100,000", sold: "500+ booked", rating: 4.6, image: "/image/hair-3.jpg", tag: "Service" },
  { id: 4, name: "Custom Wig Revamp", category: "Customization", price: "₦150,000", oldPrice: "₦200,000", sold: "700+ done", rating: 4.9, image: "/image/hair-4.jpg", tag: "Special" },
];

const categories = ["All", "Wigs", "Luxury Hair", "others", "Night Wears"];

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" } }) };

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { cartItems, addToCart, removeFromCart } = useCart();

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((item) => item.category === activeCategory);

  const handleCartToggle = (product) => {
    const isAdded = cartItems.find((item) => item.id === product.id);
    if (isAdded) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <section className="relative w-full py-20 bg-gradient-to-t pt-28 from-purple-100 via-yellow-50 to-purple-950 text-purple-100">
      <div className="md:max-w-7xl md:mx-auto px-6 sm:px-4 text-center">
           {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl text-primary-50 font-extrabold text-gold tracking-wide mb-6"
        >
          Shop Our Collection
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          className="max-w-2xl mx-auto text-primary-100 mb-10"
        >
          Explore premium wigs, luxury hair, and styling essentials crafted for timeless beauty. 
          Experience the elegance of HairDiva Empire.
        </motion.p>

        {/* Category Filter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={3}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm text-primary-50 font-medium transition ${
                activeCategory === cat
                  ? "bg-primary-200 text-purple-900"
                  : "bg-primary-200/10 backdrop-blur-md hover:bg-primary-500/10 hover:text-purple-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 sm:gap-2">
          {filteredProducts.map((product, idx) => {
            const isAdded = cartItems.find((item) => item.id === product.id);
            return (
              <motion.div
                key={product.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={idx}
                className="bg-white md:rounded-3xl sm:rounded-md shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl group"
              >
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full md:h-64 sm:h-36 object-cover" />
                  {product.tag && (
                    <span className="absolute top-0 left-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-semibold px-3 sm:text-sm py-1 rounded-r-md text-sm">
                      {product.tag}
                    </span>
                  )}

                  {/* Mobile Add to Cart */}
                  <div className="absolute bottom-2 right-2 md:hidden z-20">
                    <button
                      onClick={() => handleCartToggle(product)}
                      className={`p-2 rounded-md font-semibold transition-all ${
                        isAdded ? "bg-green-500 text-white hover:bg-green-600" : "bg-yellow-400 text-purple-900 hover:bg-yellow-400"
                      } flex items-center justify-center`}
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="py-4 px-3 text-purple-900">
                  <h3 className="text-base sm:text-sm font-semibold mb-2 md:line-clamp-1 sm:line-clamp-2">{product.name}</h3>
                  {/* Ratings */}
                  <div className="flex sm:text-sm items-center mb-1">
                    {[...Array(5)].map((_, i) =>
                      i < Math.floor(product.rating) ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-yellow-400/50" />
                    )}
                    <span className="text-gray-500 text-sm ml-2 sm:text-sm">({product.sold})</span>
                  </div>

                  {/* Price & Desktop Add/Remove */}
                  <div className="hidden md:flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-bold">{product.price}</span>
                      {product.oldPrice && <span className="text-sm line-through text-gray-400 ml-2">{product.oldPrice}</span>}
                    </div>
                    <button
                      onClick={() => handleCartToggle(product)}
                      className={`px-3 py-1 mt-2 rounded-md font-semibold transition-all ${
                        isAdded ? "bg-green-500 text-white hover:bg-green-600" : "bg-yellow-500 text-purple-900 hover:bg-yellow-400"
                      } flex items-center gap-2`}
                    >
                      <FaShoppingCart /> {isAdded ? "Added" : "Add"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


export default Shop;
