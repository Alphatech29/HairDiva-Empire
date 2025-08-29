import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./general/Index";
import Header from "./general/partials/header";
import Footer from "./general/partials/footer";
import Portfolio from "./general/portfolio";
import Contact from "./general/contact";

export default function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Index />} />
         <Route path="/portfolio" element={<Portfolio />} />
         <Route path="/contact-us" element={<Contact />} />
      </Routes>
      <Footer/>
    </Router>
  );
}
