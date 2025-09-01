import React, { useEffect, useRef } from "react";
import {
  FaLaptopCode, 
  FaMobileAlt, 
  FaPaintBrush,
  FaCloud,
  FaLock, 
  FaDatabase, 
  FaShoppingCart, 
  FaSearch,
   FaCheckCircle,
} from "react-icons/fa";

import { motion, useAnimation } from "framer-motion";
import Pageheader from "./partials/pageHeader";
import TestimonialSection from "../componenets/testimonialsSection";
import FeatureSection from "../componenets/featureSection";
import { NavLink } from "react-router-dom";

// Services Data
const services = [
  {
    icon: <FaLaptopCode size={30} className="text-primary-400" />,
    title: "Web Development",
    description: "We build scalable, responsive, and modern websites tailored to your business needs.",
  },
  {
    icon: <FaMobileAlt size={30} className="text-primary-400" />,
    title: "Mobile App Development",
    description: "Cross-platform mobile solutions with seamless UX and high performance.",
  },
  {
    icon: <FaPaintBrush size={30} className="text-primary-400" />,
    title: "UI/UX Design",
    description: "Designing intuitive interfaces and engaging experiences for your users.",
  },
  {
    icon: <FaCloud size={30} className="text-primary-400" />,
    title: "Cloud Solutions",
    description: "Secure, scalable, and efficient cloud integrations to empower your business.",
  },
  {
    icon: <FaLock size={30} className="text-primary-400" />,
    title: "Cybersecurity",
    description: "Protecting your digital assets with modern security solutions and compliance standards.",
  },
  {
    icon: <FaDatabase size={30} className="text-primary-400" />,
    title: "Database Management",
    description: "Reliable database design, optimization, and maintenance services.",
  },
  {
    icon: <FaShoppingCart size={30} className="text-primary-400" />,
    title: "E-commerce Solutions",
    description: "Custom online stores with secure payment integrations and smooth shopping experiences.",
  },
  {
    icon: <FaSearch size={30} className="text-primary-400" />,
    title: "SEO Optimization",
    description: "Boosting visibility and search rankings to help your business reach the right audience.",
  },

];


// Features Data
const features = [
  "Expert & Experienced Team",
  "Custom Solutions for Every Client",
  "Affordable and Transparent Pricing",
  "Fast Delivery & Continuous Support",
];

// Technologies Data
const technologies = [
  {
    logo: "https://blinktech.com.ng/wp-content/uploads/2024/06/I-Will-Write-Javascript-Html-Css-Php-Jquery-Code-For-You.jpeg",
  },
  {
    logo: "https://www.startechup.com/wp-content/uploads/January-11-2021-Nodejs-What-it-is-used-for-and-when-where-to-use-it-for-your-enterprise-app-development.jpg.webp",
  },
  {
    logo: "https://www.elbuild.it/assets/img/techs/mysql.png",
  },
  {
    logo: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*z5I4J44MzcC478_RVg8VdA.png",
  },
  {
    logo: "https://www.techmonitor.ai/wp-content/uploads/sites/29/2016/07/wordpress-logo-1.jpg",
  },
  {
    logo: "https://i0.wp.com/the-saltstore.com/wp-content/uploads/2023/10/React-JS.png?w=1400&ssl=1",
  },
   {
    logo: "https://www.okoone.com/wp-content/uploads/2024/10/tailwindcss-logo-400x245.png",
  },
  {
    logo: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fhpg6if7btrwilqkidqbe.png",
  },
  {
    logo: "https://www.okoone.com/wp-content/uploads/2024/06/firebase-logo-400x245.png",
  },
];

// Card animation
const cardVariants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.3, duration: 0.8 } },
};

const Services = () => {
  useEffect(() => {
      document.title =
        "Our Services | We create digital solutions that enhance communication and growth.";
    }, []);

  // Auto-scroll for Technologies Carousel
  const controls = useAnimation();
  const carouselRef = useRef(null);

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" },
      },
    });
  }, [controls]);

  return (
    <>
    <Pageheader title="Our Services" description="We offer a wide range of professional services to help your business grow and succeed online." />
     <div>
      {/* Services Grid */}
      <section className="py-20 sm:py-10 bg-primary-200">
        <div className="lg:px-[5rem] px-6">
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-primary-500 via-primary-800 to-primary-600 p-8 rounded-2xl shadow-lg"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-white text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    {/* Technologies Carousel */}
<section className="py-20 bg-primary-200 overflow-hidden">
  <div className="lg:px-[5rem] px-6 text-center">
    <h2 className="text-4xl font-bold mb-12 text-primary-800">Technologies We Use</h2>
    <motion.div
      className="flex space-x-12 cursor-grab"
      drag="x"
      dragConstraints={{ left: -1000, right: 0 }}
      whileTap={{ cursor: "grabbing" }}
      animate={controls}
    >
      {[...technologies, ...technologies].map((tech, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md min-w-[120px] hover:scale-105 transition-transform duration-300"
        >
          <img
            src={tech.logo}
            alt={tech.name}
            className="w-16 h-10 object-contain"
          />
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
      {/* Why Choose Us */}
     <FeatureSection/>

      {/* Testimonials */}
      <TestimonialSection/>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary-200 via-primary-400 to-primary-300 py-20 text-center text-white ">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p className="mb-8 sm-px-4">Contact us today and let's build something amazing together.</p>
        <NavLink
          to="/hire-us"
          className="bg-white text-primary-500 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-primary-100 transition"
        >
          Get in Touch
        </NavLink>
      </section>
    </div>
    </>

  );
};

export default Services;
