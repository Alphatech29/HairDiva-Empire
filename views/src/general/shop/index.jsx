import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
  FaDollarSign,
} from "react-icons/fa";
import { getAllOrders } from "../../utilitys/order";
import { getAllProducts } from "../../utilitys/products";
import { formatAmount } from "../../utilitys/formatAmount";

// Reusable StatCard
function StatCard({ title, value, icon, gradient }) {
  return (
    <div
      className={`rounded-2xl p-6 flex items-center gap-4 shadow-lg ${gradient} text-white transition-transform transform hover:scale-105`}
    >
      <div className="p-4 bg-white rounded-full shadow-md text-gray-800">
        {icon}
      </div>
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

// Products Overview Card
function ProductsCard({ total, sold, remaining }) {
  const soldPercent = total > 0 ? ((sold / total) * 100).toFixed(1) : 0;
  const remainingPercent = total > 0 ? ((remaining / total) * 100).toFixed(1) : 0;

  return (
    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg text-white hover:scale-105 transition-transform">
      <h2 className="text-xl font-semibold mb-4">Products Overview</h2>
      <p className="text-sm opacity-80 mb-4">
        Total Products: <span className="font-bold">{formatAmount(total)}</span>
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Sold */}
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-green-200">Sold</p>
          <h3 className="text-lg font-bold">{formatAmount(sold)}</h3>
          <p className="text-xs text-green-100">{soldPercent}% of total</p>
        </div>

        {/* Remaining */}
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-green-200">Remaining</p>
          <h3 className="text-lg font-bold">{formatAmount(remaining)}</h3>
          <p className="text-xs text-green-100">{remainingPercent}% of total</p>
        </div>
      </div>
    </div>
  );
}

// Revenue Overview with Mini-Cards
function RevenueCard({ daily, weekly, monthly, yearly }) {
  const dailyPercent = yearly > 0 ? ((daily / yearly) * 100).toFixed(1) : 0;
  const weeklyPercent = yearly > 0 ? ((weekly / yearly) * 100).toFixed(1) : 0;
  const monthlyPercent = yearly > 0 ? ((monthly / yearly) * 100).toFixed(1) : 0;
  const yearlyPercent = yearly > 0 ? ((yearly / yearly) * 100).toFixed(1) : 0;

  return (
    <div className="bg-gradient-to-br from-orange-400 to-yellow-500 p-6 rounded-2xl shadow-lg text-white hover:scale-105 transition-transform">
      <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Daily */}
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-yellow-200">Daily</p>
          <h3 className="text-lg font-bold">{formatAmount(daily)}</h3>
          <p className="text-xs text-yellow-100">{dailyPercent}% of yearly</p>
        </div>

        {/* Weekly */}
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-yellow-200">Weekly</p>
          <h3 className="text-lg font-bold">{formatAmount(weekly)}</h3>
          <p className="text-xs text-yellow-100">{weeklyPercent}% of yearly</p>
        </div>

        {/* Monthly */}
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-yellow-200">Monthly</p>
          <h3 className="text-lg font-bold">{formatAmount(monthly)}</h3>
          <p className="text-xs text-yellow-100">{monthlyPercent}% of yearly</p>
        </div>

        {/* Yearly */}
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-yellow-200">Yearly</p>
          <h3 className="text-lg font-bold">{formatAmount(yearly)}</h3>
          <p className="text-xs text-yellow-100">{yearlyPercent}% of yearly</p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    customers: 0,
    totalRevenue: 0,
    productsTotal: 0,
    productsSold: 0,
    productsRemaining: 0,
  });

  const [revenueData, setRevenueData] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        // Fetch orders
        const orderResponse = await getAllOrders();
        const orders = orderResponse?.orders || [];

        const totalOrders = orders.length;
        const customers = new Set(orders.map((o) => o.customer_email)).size;
        const totalRevenue = orders.reduce(
          (sum, o) => sum + parseFloat(o.total || 0),
          0
        );

        // Revenue by time periods
        const now = new Date();
        let daily = 0,
          weekly = 0,
          monthly = 0,
          yearly = 0;

        orders.forEach((o) => {
          if (!o.paid_at) return;
          const paidAt = new Date(o.paid_at);
          const diffDays = (now - paidAt) / (1000 * 60 * 60 * 24);

          yearly += parseFloat(o.total || 0);
          if (diffDays <= 30) monthly += parseFloat(o.total || 0);
          if (diffDays <= 7) weekly += parseFloat(o.total || 0);
          if (diffDays <= 1) daily += parseFloat(o.total || 0);
        });

        // Fetch products
        const productResponse = await getAllProducts();
        const products = productResponse?.data || [];

        let productsTotal = 0;
        let productsSold = 0;

        products.forEach((p) => {
          p.variants.forEach((v) => {
            productsSold += v.sold || 0;
            productsTotal += v.stock || 0;
          });
        });

        let productsRemaining = productsTotal;

        // Update state
        setStats({
          totalOrders,
          customers,
          totalRevenue,
          productsTotal,
          productsSold,
          productsRemaining,
        });

        setRevenueData({ daily, weekly, monthly, yearly });
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 py-10">Loading dashboard...</p>
    );
  if (error)
    return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className=" space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
        E-Commerce Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<FaShoppingCart size={28} />}
          gradient="bg-gradient-to-br from-purple-500 to-indigo-600"
        />
        <StatCard
          title="Customers"
          value={stats.customers}
          icon={<FaUsers size={28} />}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Products"
          value={stats.productsTotal}
          icon={<FaBoxOpen size={28} />}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatCard
          title="Revenue"
          value={formatAmount(stats.totalRevenue)}
          icon={<FaDollarSign size={28} />}
          gradient="bg-gradient-to-br from-yellow-400 to-orange-500"
        />
      </div>

      {/* Products & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductsCard
          total={stats.productsTotal}
          sold={stats.productsSold}
          remaining={stats.productsRemaining}
        />
        <RevenueCard
          daily={revenueData.daily}
          weekly={revenueData.weekly}
          monthly={revenueData.monthly}
          yearly={revenueData.yearly}
        />
      </div>
    </div>
  );
}
