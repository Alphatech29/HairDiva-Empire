import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../general/shop/dashboard";
import Home from "../general/shop/index";
import Products from "../general/shop/products";
import AddProduct from "../general/shop/addProduct";
import EditProduct from "../general/shop/editProduct";

export default function ShopRoute() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products/>}></Route>
        <Route path="products/add" element={<AddProduct/>}></Route>
        <Route path="products/edit/:id" element={<EditProduct/>}></Route>
      </Route>
    </Routes>
  );
}
