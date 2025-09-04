import React from "react";
import Hero from "../componenets/hero";
import Trending from "../componenets/trending";
import Nightwear from "../componenets/nightWear";
import AboutUsSection from "../componenets/AboutUsSection";
import Look from "../componenets/look";
import SalonSection from "../componenets/salonSection";


function Index() {
  return (
<>
  <Hero/>
  <Look />
  <Trending/>
  <Nightwear/>
  <AboutUsSection/>
  <SalonSection/>
</>
  );
}

export default Index;
