import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8 },
    }),
  };

  return (
    <section className="bg-primary-950 text-primary-100 py-16 px-6 mobile:px-4 tab:px-16 pc:px-[5rem]">
      <div className="flex flex-col tab:flex-row justify-between items-center gap-10">
        {/* Left Image */}
        <motion.div
          className="w-full tab:w-1/2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="rounded-xl overflow-hidden flex justify-center items-center">
            <img
              src="/image/Check.png"
              alt="Happy Developer"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Right Text */}
        <div className="space-y-6 w-full tab:w-1/2">
          <motion.p
            className="text-yellow-400 font-medium"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
          >
            We are Software Development Agency
          </motion.p>

          <motion.h2
            className="text-3xl tab:text-4xl font-bold"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
          >
            Premier Web Design Firm in Nigeria, Celebrated for Excellence and Innovation.
          </motion.h2>

          <motion.p
            className="text-gray-200"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
          >
            We focus on building strong brands and delivering innovative,
            business-focused solutions that drive results. Our award-winning
            design team has created websites for a wide range of clients, and we
            take pride in our commitment to excellence, outstanding client
            service, and proven success.
          </motion.p>

          <motion.p
            className="text-gray-200"
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
          >
            Alphatech, a renowned software and IT development agency, has been
            delivering exceptional services in Nigeria and internationally. We
            specialize in results-driven digital solutions that help businesses
            grow and succeed.
          </motion.p>

          <motion.button
            className="bg-gradient-to-r from-purple-700 to-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
          >
            Know more about us
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
