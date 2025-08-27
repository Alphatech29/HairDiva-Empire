import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-primary-800/90" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center text-primary-100 font-medium py-4 mobile:px-4 pc:px-[5rem]">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary-200"><img
              src="/image/favicon.png"
              alt="Logo"
              className=" object-contain w-36"
            /></div>

        {/* Navigation */}
        <nav className="hidden tab:flex space-x-6 items-center">
          <a href="/" className="hover:text-primary-400 transition">
            Home
          </a>
          <a href="#services" className="hover:text-primary-400 transition">
            Services
          </a>
          <a href="#about" className="hover:text-primary-400 transition">
            About
          </a>
          <a href="#contact" className="hover:text-primary-400 transition">
            Contact
          </a>
          <button className="px-4 py-2 bg-gradient-to-r from-primary-700 to-secondary-500 rounded-lg hover:opacity-90 transition">
             Hire Us
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="tab:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="tab:hidden w-full px-4 pb-4 flex flex-col space-y-4 bg-primary-950">
          <a href="#home" className="hover:text-primary-400 transition" onClick={toggleMenu}>
            Home
          </a>
          <a href="#services" className="hover:text-primary-400 transition" onClick={toggleMenu}>
            Services
          </a>
          <a href="#about" className="hover:text-primary-400 transition" onClick={toggleMenu}>
            About
          </a>
          <a href="#contact" className="hover:text-primary-400 transition" onClick={toggleMenu}>
            Contact
          </a>
          <button className="px-4 py-2 bg-gradient-to-r from-primary-700 to-secondary-500 rounded-lg hover:opacity-90 transition">
            Hire Us
          </button>
        </div>
      )}
    </header>
  );
}
