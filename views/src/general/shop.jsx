import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../utilitys/cartContext";
import { getAllProducts } from "../utilitys/products";
import { slugify } from "../utilitys/slugs";
import { Link } from "react-router-dom";

// Categories
const categories = [
  "All",
  "Wigs",
  "Luxury Hair",
  "Human Hair",
  "Others",
  "Night Wears",
];

// Animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

// Helper functions
const getTotalSold = (product) =>
  product.colors?.reduce((sum, color) => {
    const colorSold = color.variants?.reduce(
      (vSum, v) => vSum + (v.sold || 0),
      0
    );
    return sum + colorSold;
  }, 0) || 0;

const formatSold = (num) => {
  if (num >= 1000)
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K+ sold";
  if (num > 0) return num + "+ sold";
  return "0 sold";
};

const getFallbackPrice = (product) =>
  product.colors?.[0]?.variants?.[0]?.price || 0;
const getFallbackOldPrice = (product) =>
  product.colors?.[0]?.variants?.[0]?.old_price || null;
const getFallbackImage = (product) =>
  product.colors?.[0]?.image || "/image/placeholder.jpg";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      if (response.success) setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Category filter
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((item) => item.hair_type === activeCategory);

  // Cart toggle
  const handleCartToggle = (product) => {
    const isAdded = cartItems.find((item) => item.id === product.id);
    if (isAdded) removeFromCart(product.id);
    else addToCart(product);
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
          Explore premium wigs, luxury hair, and styling essentials crafted for
          timeless beauty.
        </motion.p>

        {/* Categories */}
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 sm:gap-2">
          {filteredProducts.map((product, idx) => {
            const isAdded = cartItems.find((item) => item.id === product.id);
            const totalSold = getTotalSold(product);
            const soldLabel = formatSold(totalSold);
            const fallbackPrice = getFallbackPrice(product);
            const fallbackOldPrice = getFallbackOldPrice(product);
            const fallbackImage = getFallbackImage(product);

            // create slug + include ID
            const productSlug = slugify(product.product_name);
            const productUrl = `/shop/product/${productSlug}-${product.id}`;

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
                {/* Wrap the whole card in Link */}
                <Link to={productUrl} className="block">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={fallbackImage}
                      alt={product.product_name}
                      className="w-full md:h-64 sm:h-36 object-cover"
                    />

                    {/* Mobile Add to Cart */}
                    <div className="absolute bottom-2 right-2 md:hidden z-20">
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // prevent navigating
                          handleCartToggle(product);
                        }}
                        className={`p-2 rounded-md font-semibold transition-all ${
                          isAdded
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-yellow-400 text-purple-900 hover:bg-yellow-400"
                        } flex items-center justify-center`}
                      >
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="py-4 px-3 text-purple-900">
                    <h3 className="text-base sm:text-sm font-semibold mb-2 md:line-clamp-1 sm:line-clamp-2">
                      {product.product_name}
                    </h3>

                    {/* Ratings + Sold */}
                    <div className="flex flex-col space-y-3">
                     <div className="flex sm:text-sm items-center mb-1">
                       {[...Array(5)].map((_, i) =>
                        i < 4 ? (
                          <FaStar key={i} className="text-yellow-400" />
                        ) : (
                          <FaRegStar key={i} className="text-yellow-400/50" />
                        )
                      )}
                      <span className="text-gray-500 text-sm ml-2 sm:text-sm">
                        {soldLabel}
                      </span>
                     </div>
                       <div className="md:hidden sm:flex">
                        <span className="text-sm font-bold text-primary-900">
                          ₦{fallbackPrice.toLocaleString()}
                        </span>
                        {fallbackOldPrice && (
                          <span className="text-sm line-through text-gray-400 ml-2">
                            ₦{fallbackOldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-between mb-2 px-3 pb-3">
                      <div>
                        <span className="text-sm font-bold text-primary-900">
                          ₦{fallbackPrice.toLocaleString()}
                        </span>
                        {fallbackOldPrice && (
                          <span className="text-sm line-through text-gray-400 ml-2">
                            ₦{fallbackOldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleCartToggle(product)}
                        className={`px-3 py-1 mt-2 rounded-md font-semibold transition-all flex items-center gap-2 ${
                          isAdded
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-yellow-400 text-purple-900 hover:bg-yellow-300"
                        }`}
                      >
                        <FaShoppingCart /> {isAdded ? "Added" : "Add"}
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Shop;
