import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../general/shop/dashboard";

export default function ShopRoute() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
