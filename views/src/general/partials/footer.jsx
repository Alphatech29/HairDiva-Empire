import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok , FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-l from-purple-900 via-purple-800 to-purple-900 text-white pt-16 pb-10 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[url('/images/footer-texture.png')] opacity-10 bg-cover" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 z-10">
        {/* Brand Info */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="space-y-5"
        >
          <h2 className="text-3xl font-extrabold text-gold tracking-wide">
            HairDiva Empire
          </h2>
          <p className="text-sm leading-relaxed text-gray-200">
            Redefining beauty with premium wigs, luxury hair, flawless installations,
            revamping, and custom styling. Experience elegance like never before.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
        >
          <h3 className="text-xl font-semibold mb-4 text-white relative after:content-[''] after:block after:w-12 after:h-1 after:bg-gold after:mt-2">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#services" className="hover:text-gold transition">Services</a></li>
            <li><a href="#about" className="hover:text-gold transition">About Us</a></li>
            <li><a href="#contact" className="hover:text-gold transition">Contact</a></li>
            <li><a href="#book" className="hover:text-gold transition">Book Appointment</a></li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={3}
        >
          <h3 className="text-xl font-semibold mb-4 text-white relative after:content-[''] after:block after:w-12 after:h-1 after:bg-gold after:mt-2">
            Stay Updated
          </h3>
          <p className="text-sm mb-4 text-gray-200">
            Subscribe to get the latest offers, tips, and updates.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-md text-black focus:outline-none"
            />
            <button className="px-4 py-2 bg-yellow-500 bg-gold text-purple-900 font-semibold rounded-r-md hover:bg-yellow-400 transition">
              Subscribe
            </button>
          </form>
        </motion.div>

        {/* Contact & Socials */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={4}
        >
          <h3 className="text-xl font-semibold mb-4 text-white relative after:content-[''] after:block after:w-12 after:h-1 after:bg-gold after:mt-2">
            Connect With Us
          </h3>
          <p className="text-sm">support@hairdivaempire.com</p>
          <p className="text-sm">+234 906 933 0880</p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-gold transition transform hover:scale-110">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-gold transition transform hover:scale-110">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@hairdivaempire?_t=ZS-8zQtlkfGZOe&_r=1" className="p-3 bg-white/10 rounded-full hover:bg-gold transition transform hover:scale-110">
              <FaTiktok  className="w-5 h-5" />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=2349069330880&text&type=phone_number&app_absent=0" className="p-3 bg-white/10 rounded-full hover:bg-gold transition transform hover:scale-110">
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        custom={5}
        className="relative mt-12 border-t border-purple-700 pt-6 text-center text-sm text-gray-300 z-10"
      >
        © {new Date().getFullYear()} HairDiva Empire. All Rights Reserved.- Devloper by <span><a href="https://alphatech.ng/">Alphatech</a></span>
      </motion.div>
    </footer>
  );
};

export default Footer;
