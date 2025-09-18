import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "../utilitys/cartContext";
import { getAllProducts } from "../utilitys/products";
import { slugify } from "../utilitys/slugs";
import { Link } from "react-router-dom";
import ProductCard from "../components/productCard";

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

// Helper to format prices
const formatPrice = (price) => {
  if (!price) return 0;
  return parseInt(price, 10).toLocaleString();
};

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await getAllProducts();
      if (response.success) setProducts(response.data);
      setLoading(false);
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
          {loading
            ? // Show skeletons while loading
              Array.from({ length: 8 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={idx}
                >
                  <ProductCard loading={true} />
                </motion.div>
              ))
            : filteredProducts.map((product, idx) => {
                const isAdded = cartItems.find(
                  (item) => item.id === product.id
                );

                // find lowest price from variants
                let fallbackPrice = 0;
                let fallbackOldPrice = null;

                if (product.variants?.length > 0) {
                  const sorted = [...product.variants].sort(
                    (a, b) => parseFloat(a.price) - parseFloat(b.price)
                  );
                  fallbackPrice = formatPrice(sorted[0].price);
                  fallbackOldPrice = sorted[0].old_price
                    ? formatPrice(sorted[0].old_price)
                    : null;
                }

                const fallbackImage =
                  product.image_url || "/image/placeholder.jpg";

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
                  >
                    <Link to={productUrl}>
                      <ProductCard
                        product={{
                          ...product,
                          image: fallbackImage,
                          price: fallbackPrice,
                          oldPrice: fallbackOldPrice,
                          sold: product.total_sold || 0,
                          rating: 4,
                        }}
                        isInCart={(id) =>
                          !!cartItems.find((item) => item.id === id)
                        }
                        handleCartClick={handleCartToggle}
                      />
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
