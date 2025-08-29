import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./general/Index";
import Header from "./general/partials/header";
import Footer from "./general/partials/footer";
import Portfolio from "./general/portfolio";
import Contact from "./general/contact";
import AboutUs from "./general/aboutUs";

export default function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Index />} />
         <Route path="/portfolio" element={<Portfolio />} />
         <Route path="/contact-us" element={<Contact />} />
         <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer/>
    </Router>
  );
}
