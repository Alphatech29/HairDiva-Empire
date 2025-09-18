import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "../utilitys/cartContext";
import ProductCard from "../components/productCard";
import { getAllProducts } from "../utilitys/products";
import { slugify } from "../utilitys/slugs";
import { Link } from "react-router-dom";

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

export default function Trending() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await getAllProducts();
      if (response.success) {
        const filtered = response.data.filter(
          (p) =>
            ["Hot", "Sales", "Popular", "New"].includes(p.tag) &&
            p.hair_type?.toLowerCase() !== "night wears"
        );
        setProducts(filtered.slice(0, 8));
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Cart utils
  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  const handleCartClick = (product) => {
    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <section className="py-16 bg-primary-100">
      <div className="md:max-w-7xl md:mx-auto px-6 sm:px-2 text-center">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl font-bold text-primary-900 mb-8"
        >
          Trending Products
        </motion.h2>

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
            : products.map((product, idx) => {
                // find lowest variant price
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
                        isInCart={isInCart}
                        handleCartClick={handleCartClick}
                      />
                    </Link>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
