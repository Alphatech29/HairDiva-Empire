import React, { useEffect } from "react";
import PortfolioSection from "../componenets/PortfolioSection";
import Pageheader from "./partials/pageHeader";

export default function Portfolio() {
  useEffect(() => {
    document.title = "My Portfolio | We create digital solutions that enhance communication and growth.";
  }, []);

  return (
    <>
      {/* Page Header Section */}
      <Pageheader
        title="Our Portfolio"
        description=" We have developed websites for a wide range of organizations, each carefully
            tailored to reflect their unique corporate identity. Browse through our
            portfolio to see examples of our work."
      />

      {/* Portfolio Grid Section */}
      <PortfolioSection />
    </>
  );
}
