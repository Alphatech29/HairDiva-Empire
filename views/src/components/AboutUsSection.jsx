import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const AboutUsSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-purple-100 via-yellow-50 to-purple-100 py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
            About <span className="text-purple-600">HairDiva Empire</span>
          </h2>
          <p className="text-xl text-gray-700 italic mb-8">
            Beauty in Every Strand
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            At HairDiva Empire, we redefine luxury in haircare. Our passion is
            creating timeless beauty through{" "}
            <span className="font-semibold">
              premium human hair, luxury wigs, flawless installations,
              revamping, and custom styling
            </span>{" "}
            —crafted to perfection for every woman.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            From sleek everyday looks to bold transformations, we’re here to
            make sure every strand tells your story of confidence, elegance, and
            effortless beauty.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-primary-600 to-yellow-500 text-white font-medium rounded-md shadow-lg transition"
          >
           <NavLink to="/shop">Explore Our Collection</NavLink>
          </motion.button>
        </motion.div>

        {/* Single Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl shadow-2xl"
        >
          <img
            src="/image/hair-1.jpg"
            alt="HairDiva Empire"
            className="w-full h-[35rem] object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
