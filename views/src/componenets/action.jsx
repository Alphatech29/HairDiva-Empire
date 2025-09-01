// action.jsx
import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Action = () => {
  return (
    <section className="flex justify-center items-center mobile:px-4 py-12 bg-primary-200">
      <motion.div
        className="bg-primary-900 text-primary-200 rounded-lg px-8 py-12 flex flex-col pc:flex-row items-center pc:justify-between w-full max-w-7xl  shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Side Text */}
        <motion.div
          className="mb-6 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-primary-200 text-2xl">
            Need a Website for Your Business?
          </p>
          <h2 className="text-base font-semibold text-primary-400 max-w-3xl">
            Your online journey starts here! From sleek designs to powerful functionality, 
            we’ll help you create a website that not only looks amazing but also works 
            seamlessly to grow your brand and connect with your audience.
          </h2>
        </motion.div>

        {/* Right Side Button */}
        <motion.button
          className="px-6 py-3 rounded-md text-white font-medium bg-gradient-to-r from-primary-700 via-primary-500 to-secondary-400 hover:opacity-90 transition"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <NavLink to="/hire-us">Claim Your Spot on the Web</NavLink>

        </motion.button>
      </motion.div>
    </section>
  );
};

export default Action;
