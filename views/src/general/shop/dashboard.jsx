import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../general/shop/partials/hearder";
import Sidebar from "../../general/shop/partials/sidebar";
import Footer from "../../general/shop/partials/footer";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 bg-primary-100">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
