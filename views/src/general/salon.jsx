import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaCut, FaPaintBrush, FaHeart, FaCrown, FaMagic, FaFeatherAlt } from "react-icons/fa"; 
import { motion } from "framer-motion";
import SalonSection from "../components/salonSection";

const images = [
  "/image/Edited-1.png",
  "/image/Edited-2.png",
  "/image/Edited-3.png",
];

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Salon = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="font-inter min-h-screen relative bg-primary-950">
        {/* Small screen image */}
        <div className="absolute inset-0 md:hidden">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Salon showcase"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentImageIndex && fade
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center h-screen px-4 relative z-10">
          {/* Left Content */}
          <motion.div
            className="flex-1 flex flex-col justify-center px-6 md:px-16 text-white h-full"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              We are creating a legacy of{" "}
              <span className="text-secondary-500">Hair Curls and Braids</span>
            </h1>
            <p className="text-lg md:text-xl max-w-lg mb-6">
              Hair Diva Empire is your sanctuary, where every strand tells a
              story of confidence, empowerment, and celebrating your unique
              beauty.
            </p>
            <div className="flex gap-4">
              <NavLink
                to="/salon/book-appointment"
                className="px-6 py-3 bg-secondary-400 text-black rounded-md font-bold"
              >
                Book a Service
              </NavLink>
              <NavLink
                to="/shop"
                className="px-6 py-3 border border-white rounded-md font-bold"
              >
                Buy Hair
              </NavLink>
            </div>
          </motion.div>

          {/* Right Image Container for md+ screens */}
          <div className="hidden md:flex flex-1 relative w-full h-full overflow-hidden">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Salon showcase"
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentImageIndex && fade
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

       {/* Everything Hair & Beautiful Section */}
      <motion.section
        className="bg-secondary-50 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-6">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              Everything Hair & Beautiful
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              From braids to wigs, curls to treatments, Hair Diva is the home 
              of all things hair — crafted with love, skill, and passion 
              for your beauty.
            </p>

            <ul className="space-y-6 text-gray-700">
              <li className="flex items-center gap-3">
                <FaCrown className="text-secondary-500 w-6 h-6" />
                <span className="font-medium">Braids & Weaves that define elegance</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMagic className="text-secondary-500 w-6 h-6" />
                <span className="font-medium">Premium Wigs & Extensions for versatility</span>
              </li>
              <li className="flex items-center gap-3">
                <FaFeatherAlt className="text-secondary-500 w-6 h-6" />
                <span className="font-medium">Curls & Treatments for shine and health</span>
              </li>
            </ul>

            <NavLink
              to="/salon/book-appointment"
              className="mt-8 inline-block px-6 py-3 bg-secondary-400 text-black rounded-md font-bold"
            >
              Book Your Hair Session
            </NavLink>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="/image/Edited-4.png"
              alt="Beautiful Hair Styles"
              className="rounded-2xl shadow-lg sm:w-[100vw] sm:h-[40vh] md:h-[60vh] md:w-full object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Beauty Section */}
      <motion.section
        className="bg-white py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            Beauty Beyond Hair
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            At Hair Diva Empire, beauty is more than just hairstyles. 
            We add the finishing touches that make you glow with confidence.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {[ 
              { icon: <FaCut className="w-12 h-12 mx-auto text-secondary-500 mb-4" />, title: "Makeup & Styling", desc: "From soft glam to bold transformations, we bring your perfect look to life with professional artistry." },
              { icon: <FaPaintBrush className="w-12 h-12 mx-auto text-secondary-500 mb-4" />, title: "Nail Art & Beauty Touch", desc: "Stunning nail designs and finishing touches to complete your beauty experience." },
              { icon: <FaHeart className="w-12 h-12 mx-auto text-secondary-500 mb-4" />, title: "Hair Care & Treatment", desc: "Nourishing treatments that keep your hair strong, healthy, and full of life." },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition bg-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                {service.icon}
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>



      {/* Imported Component */}
      <SalonSection />
    </>
  );
};

export default Salon;
