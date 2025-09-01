// TestimonialCarousel.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Mrs Esther",
    designation: "CEO Fundmax",
    text: "This software company delivered excellent solutions and made the entire process seamless.",
  },
  {
    name: "Franklin Johnson",
    designation: "CEO, TechCorp",
    text: "Professional, creative, and reliable. They built exactly what we needed on time.",
  },
  {
    name: "Mr Morten",
    designation: "Founder, Paysparq",
    text: "Great attention to detail and client satisfaction. Highly recommended.",
  },
  {
    name: "Mr Michael",
    designation: "CTO, InnovateNow",
    text: "Their technical expertise is top-notch, and communication was excellent throughout.",
  },
  {
    name: "Sarah Johnson",
    designation: "Manager, Betreaders",
    text: "We are impressed with their dedication and problem-solving skills.",
  },
];

const TestimonialCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
      <div className="lg:px-[5rem] px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-12">
          What Our Clients Say
        </h2>

        <div
          className="relative flex overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex gap-6"
            animate={{ x: isHovered ? 0 : ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: isHovered ? 0 : Infinity,
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-2xl p-6 w-[300px] flex-shrink-0"
              >
                <p className="text-primary-700 text-sm leading-relaxed text-center">
                  “{testimonial.text}”
                </p>
                <h3 className="mt-4 text-sm font-semibold text-primary-900">
                  {testimonial.name}
                </h3>
                <span className="text-xs text-primary-500">
                  {testimonial.designation}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
