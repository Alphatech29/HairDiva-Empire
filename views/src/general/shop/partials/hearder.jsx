import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../utilitys/authContext";


export default function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const handleLogout = () => {
    logout();
  };


  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-4 z-30 lg:pl-64">
      {/* Left: Hamburger */}
      <div className="flex items-center space-x-3">
        <button
          className="lg:hidden text-gray-600"
          onClick={toggleSidebar}
        >
          <FaBars size={22} />
        </button>
        <h1 className="text-lg font-bold text-purple-700">Dashboard</h1>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 mx-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <FaBell className="text-gray-600" size={20} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setOpen(!open)}>
            <FaUserCircle size={26} className="text-gray-600" />
          </button>

          {open && (
            <div className="absolute right-0 mt-4 w-40 bg-white border rounded-lg shadow-lg">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Profile
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Settings
                  </button>
                </li>
                <li>
                  <button
                   onClick={handleLogout}
                   className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
