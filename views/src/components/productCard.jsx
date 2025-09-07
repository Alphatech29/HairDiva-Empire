import { FaStar, FaRegStar, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product, isInCart, handleCartClick }) {
  return (
    <div className="bg-white md:rounded-3xl sm:rounded-md shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:h-64 sm:h-36 object-cover"
        />

        {product.tag && (
          <span className="absolute top-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold px-3 sm:text-sm py-1 rounded-r-md text-sm">
            {product.tag}
          </span>
        )}

        <div className="absolute bottom-2 left-2 flex gap-3 md:hidden z-30">
          <FaHeart className="text-red-500 text-2xl hover:scale-110 transition-transform cursor-pointer" />
        </div>

        <div className="absolute top-4 right-4 text-red-500 text-2xl hover:scale-110 transition-transform hidden md:block cursor-pointer">
          <FaHeart />
        </div>

        {/* Mobile Cart Button */}
        <div className="absolute bottom-2 right-2 md:hidden z-20">
          <button
            onClick={() => handleCartClick(product)}
            className={`p-2 rounded-md font-semibold transition-all ${
              isInCart(product.id)
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-yellow-400 text-primary-900 hover:bg-yellow-300"
            } flex items-center justify-center`}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>

      <div className="py-4 px-3">
        {/* Product Name always visible */}
        <h3 className="text-base text-start sm:text-sm font-semibold text-primary-900 mb-2 md:line-clamp-2 sm:line-clamp-1">
          {product.product_name}
        </h3>

        {/* Ratings + Sold */}
        <div className="flex sm:text-sm items-center mb-1">
          {[...Array(5)].map((_, i) =>
            i < Math.floor(product.rating) ? (
              <FaStar key={i} className="text-yellow-400" />
            ) : (
              <FaRegStar key={i} className="text-yellow-400/50" />
            )
          )}
          <span className="text-gray-400 text-sm ml-2 sm:text-sm">
            ({product.sold})
          </span>
        </div>

        {/* Mobile Price */}
        <div className="sm:block md:hidden mb-2">
          <span className="text-sm sm:text-xs font-bold text-primary-900">{product.price}-</span>
          {product.oldPrice && (
            <span className="text-sm line-through text-primary-400 ml-2">
              {product.oldPrice}
            </span>
          )}
        </div>

        {/* Desktop Cart Button */}
        <div className="hidden md:flex items-center justify-between mb-2">
          <div>
            <span className="text-base font-bold text-primary-900">₦{product.price}</span>
            {product.oldPrice && (
              <span className="text-sm line-through text-primary-400 ml-2">
                ₦{product.oldPrice}
              </span>
            )}
          </div>
          <button
            className={`px-3 py-1 mt-2 rounded-md font-semibold transition-all ${
              isInCart(product.id)
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-yellow-400 text-primary-900 hover:bg-yellow-300"
            } flex items-center gap-2`}
          >
            <FaShoppingCart /> {isInCart(product.id) ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
