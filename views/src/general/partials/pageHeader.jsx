import React from "react";
import { FaCode } from "react-icons/fa";

export default function Pageheader({ title, description }) {
  return (
    <div className="px-5 pc:px-20 bg-primary-950 py-10 relative overflow-clip">
      {/* Background Icon */}
      <div className="absolute top-3 left-40 text-[#d82a98] text-[30rem] blur-2xl">
        <FaCode />
      </div>

      {/* Header Section */}
      <div className="mt-28 relative z-30">
        <h1 className="text-4xl font-bold text-center mb-4 text-primary-200">
          {title}
        </h1>
        <p className="text-center text-lg text-primary-300 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
