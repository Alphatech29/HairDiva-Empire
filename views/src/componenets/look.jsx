import React from "react";
import { FaShippingFast, FaLock, FaHeadset, FaGift } from "react-icons/fa";

const features = [
  {
    title: "Fast Shipping",
    description: "Luxury hair, delivered fast safely.",
    icon: <FaShippingFast/>,
  },
  {
    title: "Secured Payment",
    description: "Transactions 100% safe and protected.",
    icon: <FaLock />,
  },
  {
    title: "24/7 Support",
    description: "Here anytime for help, advice.",
    icon: <FaHeadset />,
  },
  {
    title: "Surprise Gifts",
    description: "Exclusive gifts, offers with orders.",
    icon: <FaGift />,
  },
];

const Look = () => {
  return (
    <section className="sm:hidden md:flex relative bg-gradient-to-r from-primary-100 via-white to-primary-100 py-6 px-6 md:px-12 lg:px-24">
      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            className=" flex items-center justify-center p-6 text-center "
          >
            <div className="flex justify-center mb-4 pr-4 text-4xl text-purple-400">{feature.icon}</div>
          <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Look;
