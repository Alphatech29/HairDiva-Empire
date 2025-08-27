import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";


const FeatureSection = () => {
  const features = [
    [
      "Mobile Ready Responsiveness",
      "Search Engine Optimization (SEO)",
      "Built-in Blog / Portfolios",
      "E-Commerce Integration",
    ],
    [
      "Contact & Booking Forms",
      "Lead Conversion Optimization",
      "Social Media Integration",
      "Regular Website Backups",
    ],
    [
      "Ongoing Support & Management",
      "Continuous Website Security",
      "Website Software & Plugin Updates",
      "Fast Website Load Speeds",
    ],
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="features py-12 bg-primary-200">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Heading */}
        <motion.h5
          className="text-primary-700/70 uppercase tracking-wide"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          Features
        </motion.h5>

        <motion.h2
          className="text-xl mobile:text-2xl tab:text-3xl pc:text-4xl text-purple-900 font-bold mt-2"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          custom={2}
        >
          Website capabilities | Benefits
        </motion.h2>

        <motion.p
          className="text-primary-900 mt-4 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          custom={3}
        >
          Every website design project is executed with industry best practices. 
          Your website design will include the following features and addons, 
          ensuring deliverables align precisely with the project's scope.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 tab:grid-cols-2 pc:grid-cols-3 text-primary-200 gap-8 mt-10 text-left w-full">
          {features.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              custom={colIndex + 4}
            >
              <ul className="space-y-4">
                {column.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeUp}
                    viewport={{ once: true }}
                    custom={i * 0.2}
                  >
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-800">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
