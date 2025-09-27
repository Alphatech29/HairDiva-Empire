import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaShoppingCart, } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import CartDropdown from "../../components/cartDropdown";
import { useCart } from "../../utilitys/cartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Salon", path: "/salon" },
  { name: "Track Order", path: "/order/track-order" },
  { name: "About Us", path: "/about-us" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  const { cartItems, total } = useCart();
  const cartCount = cartItems.length;

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCart = () => setCartOpen(!cartOpen);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close cart on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) setCartOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Base style mapping
  const linkStyles = {
    base: "transition px-3 py-2 block",
    active: "font-semibold border-b-1 border-current",
    desktop: {
      scrolled: "text-primary-800 hover:text-primary-600",
      transparent: "text-white hover:text-gray-300",
      activeScrolled: "text-primary-600 border-primary-600",
      activeTransparent: "text-white border-white",
    },
    mobile: "hover:text-primary-500",
  };

  const getDesktopLinkClass = (isActive) => {
    if (isActive) return scrolled ? `${linkStyles.base} ${linkStyles.active} ${linkStyles.desktop.activeScrolled}` : `${linkStyles.base} ${linkStyles.active} ${linkStyles.desktop.activeTransparent}`;
    return scrolled ? `${linkStyles.base} ${linkStyles.desktop.scrolled}` : `${linkStyles.base} ${linkStyles.desktop.transparent}`;
  };

  const headerBg = scrolled ? "bg-primary-100 shadow-md" : "bg-transparent backdrop-blur-lg";
  const mobileBg = scrolled ? "bg-primary-100" : "bg-primary-100/30 backdrop-blur-md";
  const iconColor = scrolled ? "text-primary-800 hover:text-primary-600" : "text-white hover:text-primary-300";

  return (
    <header className="fixed w-full z-50">
      <div className={`transition-colors md:px-[5rem] duration-300 ${headerBg}`}>
        <div className="flex justify-between items-center px-4 md:px-12 py-2">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img
              src={scrolled ? "/image/logo-scrolled.png" : "/image/favicon.png"}
              alt="HairDiva Empire"
              className="md:w-40 sm:w-32 h-16 object-cover"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 font-medium">
            {navLinks.map(({ name, path }) => (
              <NavLink key={name} to={path} className={({ isActive }) => getDesktopLinkClass(isActive)}>
                {name}
              </NavLink>
            ))}
          </nav>

          {/* Icons + Mobile Menu Toggle */}
          <div className="flex items-center justify-center space-x-6 text-xl">

            <div className="relative" ref={cartRef}>
              <button onClick={toggleCart} className={`${iconColor} relative mt-3`}>
                <FaShoppingCart size={25} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              {cartOpen && <CartDropdown items={cartItems} total={total} onClose={() => setCartOpen(false)} />}
            </div>

            {/* Mobile menu toggle */}
            <div className={`${scrolled ? "text-primary-800" : "text-white"} md:hidden cursor-pointer`} onClick={toggleMenu}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className={`md:hidden absolute top-full left-0 w-full shadow-md transition-colors duration-300 ${mobileBg}`}>
            <ul className={`flex flex-col px-4 py-4 space-y-2 ${scrolled ? "text-primary-800" : "text-white"}`}>
              {navLinks.map(({ name, path }) => (
                <li key={name}>
                  <NavLink
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `${linkStyles.base} ${isActive ? linkStyles.active : linkStyles.mobile}`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
