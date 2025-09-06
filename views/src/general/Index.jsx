import React from "react";
import Hero from "../components/hero";
import Trending from "../components/trending";
import Nightwear from "../components/nightWear";
import AboutUsSection from "../components/AboutUsSection";
import Look from "../components/look";
import SalonSection from "../components/salonSection";


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
