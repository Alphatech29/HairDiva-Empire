import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaShippingFast, FaTruck, FaHourglassHalf } from "react-icons/fa";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const mockOrder = {
  orderNumber: "123456",
  status: "pending-confirmation",
  steps: [
    { key: "order-placed", label: "Order Placed", description: "Your order has been successfully placed.", date: "Fri, 19-09", icon: <FaHourglassHalf /> },
    { key: "pending-confirmation", label: "Pending Confirmation", description: "Your order is currently being processed.", date: "Fri, 19-09", icon: <FaHourglassHalf /> },
    { key: "shipped", label: "Shipped", description: "Your order is on the way.", date: "Sat, 20-09", icon: <FaShippingFast /> },
    { key: "delivered", label: "Delivered", description: "Your order has been delivered successfully.", date: "Sun, 21-09", icon: <FaCheckCircle /> },
  ],
};

const HorizontalTimeline = () => {
  const [orderDetails] = useState(mockOrder);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isStepCompleted = (stepKey) => {
    const currentIndex = orderDetails.steps.findIndex((step) => step.key === orderDetails.status);
    const stepIndex = orderDetails.steps.findIndex((step) => step.key === stepKey);
    return stepIndex <= currentIndex;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-tr from-purple-50 via-pink-50 to-yellow-50 p-6 overflow-x-auto">
      {/* Confetti */}
      {orderDetails.status === "delivered" && (
        <Confetti width={dimensions.width} height={dimensions.height} numberOfPieces={300} recycle={false} />
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Track Order <span className="text-purple-600">#{orderDetails.orderNumber}</span>
        </h1>
        <p className="text-gray-500 mt-3 text-lg">Follow your order progress in real-time</p>
      </motion.div>

      {/* Horizontal Timeline */}
      <div className="relative flex items-center justify-start space-x-16 min-w-max">
        {/* Full line behind steps */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full z-0"></div>

        {/* Animated progress */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 rounded-full z-10"
          initial={{ width: 0 }}
          animate={{
            width: `${(orderDetails.steps.findIndex((step) => step.key === orderDetails.status) / (orderDetails.steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 rounded-full"></div>
        </motion.div>

        {/* Step items */}
        {orderDetails.steps.map((step, index) => {
          const completed = isStepCompleted(step.key);

          return (
            <motion.div
              key={step.key}
              className="relative flex flex-col items-center z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg mb-4 text-2xl transition-transform duration-500 ${
                  completed ? "bg-purple-600 text-white ring-4 ring-purple-200 animate-pulse" : "bg-gray-100 text-gray-400"
                }`}
              >
                {React.cloneElement(step.icon, { className: "text-3xl" })}
              </div>
              <h3 className="font-bold text-gray-700 text-center">{step.label}</h3>
              <span className="text-gray-400 text-sm">{step.date}</span>
              <p className="text-gray-500 text-sm text-center mt-1">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalTimeline;
