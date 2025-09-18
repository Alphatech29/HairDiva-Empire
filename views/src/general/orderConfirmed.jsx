import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaBan } from "react-icons/fa";
import Confetti from "react-confetti";
import { useCart } from "../utilitys/cartContext";

const OrderConfirmed = () => {
  const { clearCart } = useCart();

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Get query params from URL
  const params = new URLSearchParams(window.location.search);
  const orderNumber = params.get("tx_ref") || "N/A";
  const status = params.get("status") || "unknown";

  // Update confetti size on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  Clear cart if successful
  useEffect(() => {
    if (status === "successful") {
      clearCart();
    }
  }, [status, clearCart]);

  // Decide UI based on status
  const isSuccess = status === "successful";
  const isFailed = status === "failed";
  const isCancelled = status === "cancelled";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-t from-purple-100 via-yellow-50 to-primary-950 p-6 pt-20 overflow-hidden">
      
      {/* Confetti only on success */}
      {isSuccess && (
        <div className="absolute inset-0 z-0 animate-fadeIn">
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            numberOfPieces={250}
            recycle={false}
          />
        </div>
      )}

      {/* Main content card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center flex flex-col items-center gap-6 animate-fadeIn">
        
        {/* Status Icon */}
        {isSuccess && <FaCheckCircle className="text-green-500 text-8xl animate-bounce" />}
        {isFailed && <FaTimesCircle className="text-red-500 text-8xl animate-pulse" />}
        {isCancelled && <FaBan className="text-yellow-500 text-8xl animate-pulse" />}

        {/* Title */}
        <h1 className="md:text-4xl sm:text-2xl font-extrabold text-gray-900 animate-pulse">
          {isSuccess && "Order Confirmed!"}
          {isFailed && "Payment Failed"}
          {isCancelled && "Payment Cancelled"}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg sm:text-base animate-fadeIn delay-200">
          {isSuccess && "Thank you for shopping with us. Your order has been successfully placed."}
          {isFailed && "Unfortunately, your payment was not successful. Please try again."}
          {isCancelled && "You cancelled the payment process. No charges were made."}
        </p>

        {/* Order Details */}
        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-2xl p-6 w-full flex flex-col gap-3 shadow-md animate-fadeIn delay-300">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Order Number:</span>
            <span className="font-medium text-gray-600">#{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Status:</span>
            <span
              className={`font-medium ${
                isSuccess ? "text-green-600" : isFailed ? "text-red-600" : "text-yellow-600"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <NavLink
          to="/shop"
          className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform animate-fadeIn delay-400"
        >
          Continue Shopping
        </NavLink>
      </div>
    </div>
  );
};

export default OrderConfirmed;
