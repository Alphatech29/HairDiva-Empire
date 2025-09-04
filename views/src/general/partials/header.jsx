import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import CartDropdown from "../../componenets/cartDropdown";
import { useCart } from "../../utilitys/cartContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  const { cartItems, total } = useCart();
  const cartCount = cartItems.length;

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCart = () => setCartOpen(!cartOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseClasses = "transition px-3 py-2 block";
  const activeClasses = "font-semibold border-b-2";

  return (
    <header className="fixed w-full z-50">
      <div
        className={`transition-colors md:px-[5rem] duration-300 ${
          scrolled ? "bg-primary-100 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center px-4 md:px-12 py-2">
          {/* Logo */}
          <div className={`text-2xl font-bold ${scrolled ? "text-primary-800" : "text-white"}`}>
            <img src="/image/favicon.png" alt="HairDiva Empire"
            className="md:w-40 sm:w-32 h-16 object-cover" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseClasses} ${
                  isActive
                    ? `${activeClasses} ${scrolled ? "text-primary-600 border-primary-600" : "text-white border-white"}`
                    : `${scrolled ? "text-primary-800 hover:text-primary-600" : "text-white hover:text-gray-300"}`
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `${baseClasses} ${
                  isActive
                    ? `${activeClasses} ${scrolled ? "text-primary-600 border-primary-600" : "text-white border-white"}`
                    : `${scrolled ? "text-primary-800 hover:text-primary-600" : "text-white hover:text-gray-300"}`
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/salon"
              className={({ isActive }) =>
                `${baseClasses} ${
                  isActive
                    ? `${activeClasses} ${scrolled ? "text-primary-600 border-primary-600" : "text-white border-white"}`
                    : `${scrolled ? "text-primary-800 hover:text-primary-600" : "text-white hover:text-gray-300"}`
                }`
              }
            >
              Salon
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `${baseClasses} ${
                  isActive
                    ? `${activeClasses} ${scrolled ? "text-primary-600 border-primary-600" : "text-white border-white"}`
                    : `${scrolled ? "text-primary-800 hover:text-primary-600" : "text-white hover:text-gray-300"}`
                }`
              }
            >
              About Us
            </NavLink>
          </nav>

          {/* Icons + Mobile Menu Toggle */}
          <div className="flex items-center justify-center space-x-6 text-xl">
            <NavLink
              to="/account"
              className={`${scrolled ? "text-primary-800 hover:text-primary-600" : "text-white hover:text-primary-300"}`}
            >
              <FaUser />
            </NavLink>

            <div className="relative" ref={cartRef}>
              <button
                onClick={toggleCart}
                className={`${scrolled ? "text-primary-800 hover:text-primary-600" : "text-white hover:text-primary-300"} relative`}
              >
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              {cartOpen && <CartDropdown items={cartItems} total={total} onClose={() => setCartOpen(false)} />}
            </div>

            {/* Mobile menu toggle */}
            <div
              className={`${scrolled ? "text-primary-800" : "text-white"} md:hidden cursor-pointer`}
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav
            className={`md:hidden absolute top-full left-0 w-full shadow-md transition-colors duration-300 ${
              scrolled ? "bg-primary-100" : "bg-transparent"
            }`}
          >
            <ul className={`flex flex-col px-4 py-4 space-y-2 ${scrolled ? "text-primary-800" : "text-white"}`}>
              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${baseClasses} ${isActive ? "font-semibold border-b-2 border-current" : "hover:text-primary-500"}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${baseClasses} ${isActive ? "font-semibold border-b-2 border-current" : "hover:text-primary-500"}`
                  }
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/salon"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${baseClasses} ${isActive ? "font-semibold border-b-2 border-current" : "hover:text-primary-500"}`
                  }
                >
                  Salon
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${baseClasses} ${isActive ? "font-semibold border-b-2 border-current" : "hover:text-primary-500"}`
                  }
                >
                  About Us
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
