import React, { useEffect } from 'react';
import { FaCode } from "react-icons/fa";
import PortfolioSection from '../componenets/PortfolioSection';

export default function Portfolio() {
  useEffect(() => {
    document.title = "My Portfolio | Alphatech Multimedia Technologies";
  }, []);


  return (
    <>
      <div className="px-5 pc:px-20 bg-primary-950 py-10 relative overflow-clip">
        {/* Background Icon */}
        <div className="absolute top-3 left-40 text-[#d82a98] text-[30rem] blur-2xl">
          <FaCode />
        </div>

        {/* Header Section */}
        <div className="mt-28 relative z-30">
          <h1 className="text-4xl font-bold text-center mb-4 text-primary-200">Portfolio</h1>
          <p className="text-center text-lg text-primary-300 max-w-3xl mx-auto">
            We have developed websites for a wide range of organizations, each carefully
            tailored to reflect their unique corporate identity. Browse through our
            portfolio to see examples of our work.
          </p>
        </div>
      </div>

        {/* Portfolio Grid Section */}
        <PortfolioSection/>
    </>
  );
}
