import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Example cart count

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // common nav classes
  const baseClasses = "transition";
  const activeClasses = "text-primary-400 font-semibold";

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-primary-800/90" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center text-primary-100 font-medium py-2 mobile:px-2 pc:px-[5rem]">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary-200">
          HairDiva Empire
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden tab:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            Contact
          </NavLink>

          {/* Book Appointment Button */}
          <NavLink
            to="/book-appointment"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg bg-gradient-to-r from-primary-700 to-secondary-500 hover:opacity-90 transition ${
                isActive ? "ring-2 ring-primary-400" : ""
              }`
            }
          >
            Book Appointment
          </NavLink>

          {/* Cart Icon */}
          <NavLink to="/cart" className="relative text-2xl hover:text-primary-400">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="tab:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="tab:hidden w-full text-primary-200 font-medium px-4 pb-4 flex flex-col space-y-4 bg-primary-950/90">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/products"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about-us"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/gallery"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/contact"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : "hover:text-primary-400"}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/book-appointment"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg bg-gradient-to-r from-primary-700 to-secondary-500 hover:opacity-90 transition text-center ${
                isActive ? "ring-2 ring-primary-400" : ""
              }`
            }
          >
            Book Appointment
          </NavLink>
          <NavLink
            to="/cart"
            onClick={toggleMenu}
            className="relative text-2xl hover:text-primary-400"
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      )}
    </header>
  );
}
