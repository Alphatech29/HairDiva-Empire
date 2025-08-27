import React from "react";
import { motion } from "framer-motion";

const WhySection = () => {
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8 },
    }),
  };

  return (
    <section className="bg-primary-300 text-primary-100 py-16 px-6 mobile:px-4 tab:px-16 pc:px-[5rem]">
      <div className="flex flex-col tab:flex-row justify-between items-center gap-10">
        {/* Right Text */}
        <div className="space-y-6 w-full tab:w-1/2">
          <motion.h2
            className="text-3xl text-primary-900 tab:text-4xl font-bold"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
          >
            We are the best software Commany in Nigeria
          </motion.h2>

          <motion.p
            className="text-primary-700"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
          >
            Alphatech Multimedia Technology, a premier web development company
            established in 2010, excels in delivering innovative and
            high-quality web development solutions. Our expertise spans a wide
            range of technologies, including JavaScript, Node.js, React.js, PHP,
            Laravel, Drupal, WordPress, and more.
          </motion.p>

          <motion.p
            className="text-primary-700"
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
          >
            Partner with our skilled developers to access cost-effective,
            tailor-made solutions that demonstrate exceptional industry
            knowledge and technical proficiency. We provide comprehensive web
            development services across diverse sectors such as eCommerce,
            renewable energy, entertainment, healthcare, education, and beyond.
          </motion.p>

          <motion.p
           className="text-primary-700"
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariant}
          >
            Contact us today for a free consultation with our senior web
            development experts and transform your innovative business ideas
            into reality.
          </motion.p>
        </div>
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
              src="/image/web-devlopment.svg"
              alt="Happy Developer"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
