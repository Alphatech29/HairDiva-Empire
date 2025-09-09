import React from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

export default function Header({ toggleSidebar }) {
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
        <div className="relative">
          <FaBell className="text-gray-600" size={20} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <FaUserCircle size={26} className="text-gray-600" />
        </div>
      </div>
    </header>
  );
}
