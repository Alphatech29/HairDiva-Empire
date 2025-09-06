import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { getProductById } from "../utilitys/products";
import { useCart } from "../utilitys/cartContext";

const SingleProduct = () => {
  const { slugId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const { addToCart } = useCart();

  const productId = slugId?.match(/\d+$/)?.[0];

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await getProductById(Number(productId));
        if (response.success && response.data) {
          setProduct(response.data);
        } else {
          setError("Product not found");
        }
      } catch {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error} />;
  if (!product) return <ErrorDisplay message="Product not found." />;

  const colors = product.colors || [];
  const selectedColor = colors[selectedColorIndex] || {};
  const variants = selectedColor.variants || [];
  const selectedVariant = variants[selectedVariantIndex] || {};

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart({
      id: product.id, // important for merging quantities in context
      product_name: product.product_name,
      image: selectedColor.image || product.image || "",
      color: selectedColor.color || null,
      variant: selectedVariant,
      price: selectedVariant.price || product.price || 0,
      quantity,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="py-20 bg-gradient-to-t pt-28 from-purple-100 via-yellow-50 to-purple-950 text-purple-100 min-h-screen flex justify-center">
      <motion.div
        className="w-full max-w-6xl grid md:grid-cols-2 gap-10 p-6 rounded-2xl shadow-md backdrop-blur-md bg-white/50 text-primary-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Images */}
        <div className="flex flex-col gap-4">
          <motion.img
            src={selectedColor.image || product.image || ""}
            alt={product.product_name}
            className="rounded-2xl object-cover w-full h-[420px] shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="h-auto flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.product_name}</h1>

            {/* Price */}
            <p className="text-2xl font-bold text-primary mt-6">
              ₦{selectedVariant.price?.toLocaleString() || "0"}
              {selectedVariant.old_price && (
                <span className="line-through text-gray-400 text-sm ml-3">
                  ₦{selectedVariant.old_price.toLocaleString()}
                </span>
              )}
            </p>

            {/* Variant Selector */}
            <div className="flex items-center gap-2 mt-5">
              <span>Length: </span>
              <div className="flex gap-3 flex-wrap">
                {variants.length > 0 ? (
                  variants.map((variant, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 rounded-lg shadow-md border ${
                        selectedVariantIndex === idx ? "bg-yellow-200" : "border-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedVariantIndex(idx);
                        setQuantity(1);
                      }}
                    >
                      {variant.length}" inches
                    </button>
                  ))
                ) : (
                  <span>No variants available</span>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={decreaseQuantity}
                className="p-2 border rounded-md hover:bg-gray-100 transition"
              >
                <FaMinus />
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="p-2 border rounded-md hover:bg-gray-100 transition"
              >
                <FaPlus />
              </button>
            </div>

            {/* Color Buttons */}
            <div className="flex items-center gap-2 mt-5">
              <span>Color:</span>
              <div className="flex items-center gap-3">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-2 flex justify-center items-center border rounded-md hover:bg-gray-100 transition ${
                      selectedColorIndex === idx ? "bg-yellow-200" : ""
                    }`}
                    onClick={() => {
                      setSelectedColorIndex(idx);
                      setSelectedVariantIndex(0);
                      setQuantity(1);
                    }}
                  >
                    {color.color || `Color ${idx + 1}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-full flex justify-center items-center gap-2 px-6 py-3 text-lg bg-yellow-500 text-primary-900 rounded-xl shadow-md hover:bg-yellow-400 transition"
            >
              <FaShoppingCart size={20} /> Add to Cart
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="md:col-span-2 mt-6 border-t border-gray-300 pt-4 w-full">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 font-semibold rounded-t-lg transition ${
                activeTab === "description" ? "bg-yellow-200 text-primary-900" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`px-4 py-2 font-semibold rounded-t-lg transition ${
                activeTab === "reviews" ? "bg-yellow-200 text-primary-900" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews (0)
            </button>
          </div>

          <div className="mt-4 p-4 text-gray-800">
            {activeTab === "description" ? (
              <p>{product.description || "No description available."}</p>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Added to cart!
        </div>
      )}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center p-6">
    <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
      <div className="rounded-2xl bg-gray-200 animate-pulse w-full h-[420px]" />
      <div className="flex flex-col justify-between gap-4">
        <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>
        <div className="space-y-2 mt-4">
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse mt-4" />
        <div className="flex gap-4 mt-6">
          <div className="h-12 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
    {message}
  </div>
);

export default SingleProduct;
