import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./general/Index";
import Header from "./general/partials/header";
import Footer from "./general/partials/footer";
import Shop from "./general/shop";
import { CartProvider } from "./utilitys/cartContext";
import Cart from "./general/cart";


export default function App() {
  return (
    <Router>
      <CartProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/cart" element={<Cart/>} />


      </Routes>
      <Footer/>
      </CartProvider>
    </Router>
  );
}
