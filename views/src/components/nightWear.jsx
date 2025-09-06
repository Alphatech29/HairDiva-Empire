import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaShoppingCart,
  FaEye,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useCart } from "../utilitys/cartContext";

const nightWearProducts = [
  {
    id: 1,
    name: "ROMWE Grunge Punk Women's Vintage Street Style Loose Fit Denim Capri Pants With Neutral Five-Pointed Star Appliques, School ",
    price: "₦241,367",
    oldPrice: "₦416,573",
    sold: "2.2K+ sold",
    rating: 4.5,
    image: "/image/clothe-1.jpg",
    tag: "Hot",
  },
  {
    id: 2,
    name: "Secret Love Affair Crotchless Panty - Wine",
    price: "₦258,323",
    oldPrice: "₦447,541",
    sold: "1.3K+ sold",
    rating: 4.7,
    image: "/image/clothe-2.jpg",
    tag: "New",
  },
  {
    id: 3,
    name: "Robe de pyjama décorée d'un nœud papillon",
    price: "₦5,516",
    oldPrice: "₦11,836",
    sold: "100K+ sold",
    rating: 4.6,
    image: "/image/clothe-3.jpg",
    tag: "Discount",
  },
  {
    id: 4,
    name: "Satin Alphabet & Lips Printed Cami Dress For Sleeping",
    price: "₦9,516",
    oldPrice: "₦11,836",
    sold: "100K+ sold",
    rating: 4.6,
    image: "/image/clothe-4.jpg",
    tag: "Discount",
  },
];

export default function Nightwear() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const isInCart = (productId) => cartItems.some((item) => item.id === productId);

  const handleCartClick = (product) => {
    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <section className="py-8 bg-primary-100">
      <div className="md:max-w-7xl md:mx-auto px-6 sm:px-2">
        <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">
          We sell ladies’ nightwear.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 sm:gap-2">
          {nightWearProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white md:rounded-3xl sm:rounded-md shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl group"
            >
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
                  <FaEye className="text-yellow-500 text-2xl hover:scale-110 transition-transform cursor-pointer" />
                </div>

                <div className="absolute top-4 right-4 text-red-500 text-2xl hover:scale-110 transition-transform hidden md:block cursor-pointer">
                  <FaHeart />
                </div>

                <div className="absolute inset-0 bg-black/20 pb-2 px-2 items-end justify-end opacity-0 hover:opacity-100 transition-opacity hidden md:flex">
                  <button className="bg-gradient-to-r from-primary-400 to-yellow-500 text-primary-950 text-base px-4 py-1 rounded-md font-semibold flex items-center gap-2">
                    <FaEye /> Quick View
                  </button>
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
                <h3 className="text-base sm:text-sm font-semibold text-primary-900 mb-2 md:line-clamp-1 sm:line-clamp-2">
                  {product.name}
                </h3>

                {/* Stars */}
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

                {/* Price on sm below stars */}
                <div className="sm:block md:hidden mb-2">
                  <span className="text-sm sm:text-xs font-bold text-primary-900">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm line-through text-primary-400 ml-2">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Price + Add button row for md+ */}
                <div className="hidden md:flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-bold text-primary-900">{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-sm line-through text-primary-400 ml-2">{product.oldPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleCartClick(product)}
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
          ))}
        </div>

        <div className="flex items-center justify-center mt-8">
          <NavLink
            to="/shop/night-wear"
            className="text-center px-6 py-2 text-primary-100 bg-gradient-to-r from-purple-800 to-yellow-500 rounded-md"
          >
            See More
          </NavLink>
        </div>
      </div>
    </section>
  );
}
