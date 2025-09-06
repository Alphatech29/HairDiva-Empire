import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./general/Index";
import Header from "./general/partials/header";
import Footer from "./general/partials/footer";
import Shop from "./general/shop";
import { CartProvider } from "./utilitys/cartContext";
import Cart from "./general/cart";
import SingleProduct from "./general/singleProduct";
import Checkout from "./general/checkOut";


export default function App() {
  return (
    <Router>
      <CartProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/shop/cart" element={<Cart/>} />
        <Route path="/shop/check-out" element={<Checkout/>} />
         <Route path="/shop/product/:slugId" element={<SingleProduct />} />


      </Routes>
      <Footer/>
      </CartProvider>
    </Router>
  );
}
