import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./general/Index";
import Header from "./general/partials/header";
import Footer from "./general/partials/footer";
import Shop from "./general/shop";


export default function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop/>} />

      </Routes>
      <Footer/>
    </Router>
  );
}
