import React from "react";
import { FaCut, FaStar, FaMagic, FaCrown } from "react-icons/fa";

const SalonSection = () => {
  return (
    <section
      className="w-full py-14 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/image/saloon.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 via-black/60 to-primary-900/80" />

      <div className="relative max-w-5xl mx-auto px-6 text-center text-white space-y-10 animate-fadeIn">
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl sm:text-4xl font-extrabold text-primary drop-shadow-md tracking-wide">
          HairDiva Empire - Salon
        </h2>
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Step into the world of <span className="font-semibold">HairDiva Empire</span>,
          where beauty meets luxury. From flawless installations and chic hair styling
          to expert revamping and custom creations, we deliver a signature touch that
          celebrates your individuality. Complete your look with our premium wigs and
          luxury human hair for unmatched elegance.
        </p>

        {/* Services */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center bg-primary-950/10 rounded-2xl p-6 backdrop-blur-md hover:scale-105 transition transform">
            <FaCut className="w-10 h-10 text-primary mb-3" />
            <h3 className="font-semibold text-lg">Installations</h3>
            <p className="text-sm text-gray-300">Flawless, natural, and lasting installs.</p>
          </div>

          <div className="flex flex-col items-center bg-primary-950/10 rounded-2xl p-6 backdrop-blur-md hover:scale-105 transition transform">
            <FaMagic className="w-10 h-10 text-primary mb-3" />
            <h3 className="font-semibold text-lg">Revamping</h3>
            <p className="text-sm text-gray-300">Breathe new life into your wigs.</p>
          </div>

          <div className="flex flex-col items-center bg-primary-950/10 rounded-2xl p-6 backdrop-blur-md hover:scale-105 transition transform">
            <FaStar className="w-10 h-10 text-primary mb-3" />
            <h3 className="font-semibold text-lg">Customization</h3>
            <p className="text-sm text-gray-300">Tailored styles to suit you perfectly.</p>
          </div>

          <div className="flex flex-col items-center bg-primary-950/10 rounded-2xl p-6 backdrop-blur-md hover:scale-105 transition transform">
            <FaCrown className="w-10 h-10 text-primary mb-3" />
            <h3 className="font-semibold text-lg">Luxury Hair</h3>
            <p className="text-sm text-gray-300">Premium wigs & human hair collections.</p>
          </div>
        </div>

        {/* CTA */}
        <a href="/salon/book-appointment">
         <button className="mt-8 text-white bg-primary-950/10 backdrop-blur-md rounded-md px-10 py-3 text-lg font-bold shadow-lg animate-bounce">
          Book an Appointment
        </button>
        </a>

      </div>
    </section>
  );
};

export default SalonSection;
