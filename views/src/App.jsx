import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Index from "./general/Index";
import Header from "./general/partials/header";
import Footer from "./general/partials/footer";
import Shop from "./general/shop";
import { CartProvider } from "./utilitys/cartContext";
import Cart from "./general/cart";
import SingleProduct from "./general/singleProduct";
import Checkout from "./general/checkOut";
import Login from "./general/login";
import Shoproute from "./route/shopRoute";
import ShopPrivateRoute from "./utilitys/shopPrivateRoute";
import { AuthProvider } from "./utilitys/authContext";

function Layout({ children }) {
  const location = useLocation();

  // Hide header and footer on login page
  const hideHeaderFooter = location.pathname === "/auth/login";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
       <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/cart" element={<Cart />} />
            <Route path="/shop/check-out" element={<Checkout />} />
            <Route path="/shop/product/:slugId" element={<SingleProduct />} />

             {/* Protected Admin Routes */}
            <Route element={<ShopPrivateRoute />}>
              <Route path="/store/*" element={<Shoproute />} />
            </Route>

          </Routes>
        </Layout>
      </CartProvider>
      </AuthProvider>
    </Router>
  );
}
