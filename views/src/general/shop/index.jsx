import React from "react";
import { FaShoppingCart, FaUsers, FaBoxOpen, FaDollarSign } from "react-icons/fa";


export default function Home() {
  const stats = [
    {
      title: "Total Orders",
      value: "1,245",
      icon: <FaShoppingCart size={24} />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Customers",
      value: "865",
      icon: <FaUsers size={24} />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Products",
      value: "320",
      icon: <FaBoxOpen size={24} />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Revenue",
      value: "$12,540",
      icon: <FaDollarSign size={24} />,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="lg:px-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:shadow-xl transition"
          >
            <div className={`p-3 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-xl font-bold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
