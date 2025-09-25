import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../general/shop/dashboard";
import Home from "../general/shop/index";
import Products from "../general/shop/products";
import AddProduct from "../general/shop/addProduct";
import EditProduct from "../general/shop/editProduct";
import Orders from "../general/shop/order";
import OrderDetails from "../general/shop/orderDetails";
import Transaction from "../general/shop/transaction";
import Appointment from "../general/shop/appointment";
import SalonService from "../general/shop/salonService";

export default function ShopRoute() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products/>}></Route>
        <Route path="products/add" element={<AddProduct/>}></Route>
        <Route path="products/edit/:id" element={<EditProduct/>}></Route>
        <Route path="order/:id" element={<OrderDetails/>}></Route>
        <Route path="orders" element={<Orders/>}></Route>
        <Route path="transaction" element={<Transaction/>}></Route>
        <Route path="appointment" element={<Appointment/>}></Route>
        <Route path="salon/service" element={<SalonService/>}></Route>
      </Route>
    </Routes>
  );
}
