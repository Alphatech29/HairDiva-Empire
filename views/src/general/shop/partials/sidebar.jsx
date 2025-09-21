import React from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaCog,
  FaTimes,
  FaSignOutAlt,
  FaBuromobelexperte
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../utilitys/authContext";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { name: "Dashboard", path: "/store", icon: <FaTachometerAlt /> },
    { name: "Products", path: "/store/products", icon: <FaBox /> },
    { name: "Customers", path: "/store/customers", icon: <FaUsers /> },
    { name: "Order's", path: "/store/orders", icon: <FaBuromobelexperte  /> },
    { name: "Settings", path: "/store/settings", icon: <FaCog /> },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-primary-700 via-primary-500 to-primary-900 text-white z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Logo / Close button */}
        <div className="flex items-center justify-between p-4 border-b border-primary-600">
          <img
            src="/image/favicon.png"
            alt="HairDiva Empire"
            className="md:w-32 sm:w-28 h-14 object-cover"
          />
          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="p-4 flex flex-col h-[calc(100%-80px)]">
          <div className="flex-grow space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "bg-white text-primary-700"
                    : "hover:bg-primary-800"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-red-600 bg-red-500 text-white"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
}
