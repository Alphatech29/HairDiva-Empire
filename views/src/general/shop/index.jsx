import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUsers, FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { getAllOrders } from "../../utilitys/order";
import { getAllProducts } from "../../utilitys/products";
import { getAllTransactions } from "../../utilitys/transaction";
import { formatAmount } from "../../utilitys/formatAmount";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ---------------- StatCard ----------------
function StatCard({ title, value, icon, gradient }) {
  return (
    <div className={`rounded-2xl p-6 flex items-center gap-4 shadow-lg ${gradient} text-white`}>
      <div className="p-4 bg-white rounded-full shadow-md text-gray-800">{icon}</div>
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

// ---------------- ProductsCard ----------------
function ProductsCard({ total, sold, remaining }) {
  const soldPercent = total > 0 ? ((sold / total) * 100).toFixed(1) : 0;
  const remainingPercent = total > 0 ? ((remaining / total) * 100).toFixed(1) : 0;

  return (
    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Products Overview</h2>
      <p className="text-sm opacity-80 mb-4">
        Total Products: <span className="font-bold">{total}</span>
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-green-200">Sold</p>
          <h3 className="text-lg font-bold">{sold}</h3>
          <p className="text-xs text-green-100">{soldPercent}% of total</p>
        </div>
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-green-200">Remaining</p>
          <h3 className="text-lg font-bold">{remaining}</h3>
          <p className="text-xs text-green-100">{remainingPercent}% of total</p>
        </div>
      </div>
    </div>
  );
}

// ---------------- RevenueCard ----------------
function RevenueCard({ revenueData }) {
  const { daily, weekly, monthly, yearly } = revenueData;
  const dailyPercent = yearly > 0 ? ((daily / yearly) * 100).toFixed(1) : 0;
  const weeklyPercent = yearly > 0 ? ((weekly / yearly) * 100).toFixed(1) : 0;
  const monthlyPercent = yearly > 0 ? ((monthly / yearly) * 100).toFixed(1) : 0;
  const yearlyPercent = yearly > 0 ? ((yearly / yearly) * 100).toFixed(1) : 0;

  return (
    <div className="bg-gradient-to-br from-orange-400 to-yellow-500 p-6 rounded-2xl shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-yellow-200">Daily</p>
          <h3 className="text-lg font-bold">{formatAmount(daily)}</h3>
          <p className="text-xs text-yellow-100">{dailyPercent}% of yearly</p>
        </div>
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-yellow-200">Weekly</p>
          <h3 className="text-lg font-bold">{formatAmount(weekly)}</h3>
          <p className="text-xs text-yellow-100">{weeklyPercent}% of yearly</p>
        </div>
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-yellow-200">Monthly</p>
          <h3 className="text-lg font-bold">{formatAmount(monthly)}</h3>
          <p className="text-xs text-yellow-100">{monthlyPercent}% of yearly</p>
        </div>
        <div className="bg-white/20 border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-xs text-yellow-200">Yearly</p>
          <h3 className="text-lg font-bold">{formatAmount(yearly)}</h3>
          <p className="text-xs text-yellow-100">{yearlyPercent}% of yearly</p>
        </div>
      </div>
    </div>
  );
}

// ---------------- NewOrdersCard ----------------
function NewOrdersCard({ newOrders, percentage }) {
  const isPositive = percentage >= 0;
  return (
    <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-2xl shadow-lg text-white h-48 flex flex-col justify-between">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-1">New Orders</h2>
        <h3 className="text-4xl font-extrabold">{newOrders}</h3>
        <p
          className={`text-sm mt-2 flex items-center justify-center gap-2 ${
            isPositive ? "text-green-200" : "text-red-200"
          }`}
        >
          {isPositive ? "📈" : "📉"} {percentage}% New Sessions Today
        </p>
      </div>
      <NavLink
        to="/store/orders"
        className="bg-white/20 border border-white/30 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition self-center"
      >
        View Reports
      </NavLink>
    </div>
  );
}

// ---------------- TransactionsOverview ----------------
function TransactionsOverview({ revenueData }) {
  const { daily, weekly, monthly, yearly } = revenueData;
  const data = {
    labels: ["Daily", "Weekly", "Monthly", "Yearly"],
    datasets: [
      {
        label: "Revenue (NGN)",
        data: [daily, weekly, monthly, yearly],
        backgroundColor: ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"],
        borderRadius: 6,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Revenue Overview", font: { size: 16 } },
      tooltip: {
        callbacks: { label: (ctx) => "₦" + ctx.raw.toLocaleString() },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v) => "₦" + v.toLocaleString() },
        title: { display: true, text: "Amount (NGN)" },
      },
      x: { title: { display: true, text: "Timeframe" } },
    },
  };
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg w-full sm:w-full md:h-96" style={{ minHeight: 300 }}>
      <Bar data={data} options={options} />
    </div>
  );
}

// ---------------- OrdersStatusOverview ----------------
function OrdersStatusOverview({ orders }) {
  const statusCounts = orders.reduce((acc, order) => {
    if (!acc[order.status]) acc[order.status] = 0;
    acc[order.status] += 1;
    return acc;
  }, {});

  const statusConfig = {
    pending: { label: "Pending", textColor: "text-yellow-900" },
    paid: { label: "Paid", textColor: "text-green-900" },
    shipped: { label: "Shipped", textColor: "text-blue-900" },
    completed: { label: "Completed", textColor: "text-purple-900" },
    cancelled: { label: "Cancelled", textColor: "text-red-900" },
  };

  return (
    <div className="bg-gradient-to-br from-orange-300 to-orange-400 p-6 rounded-2xl shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-6">Tracking Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {Object.keys(statusConfig).map((status) => {
          const config = statusConfig[status];
          const count = statusCounts[status] || 0;
          return (
            <div
              key={status}
              className="p-3 rounded-lg shadow-md bg-white/10 hover:bg-white/20 transition duration-300"
            >
              <p className={`text-xs font-medium ${config.textColor} mb-1 text-center`}>
                {config.label}
              </p>
              <h3 className="text-lg font-bold text-center">{count}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------- Dashboard ----------------
export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    customers: 0,
    productsTotal: 0,
    productsSold: 0,
    productsRemaining: 0,
    newOrders: 0,
    newOrderGrowth: 0,
  });
  const [orders, setOrders] = useState([]);
  const [revenueData, setRevenueData] = useState({ daily: 0, weekly: 0, monthly: 0, yearly: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const orderResp = await getAllOrders();
        const fetchedOrders = orderResp?.orders || [];
        setOrders(fetchedOrders);
        const totalOrders = fetchedOrders.length;
        const customers = new Set(fetchedOrders.map((o) => o.customer_email)).size;

        const productResp = await getAllProducts();
        const products = productResp?.data || [];
        let productsTotal = 0, productsSold = 0;
        products.forEach((p) => p.variants.forEach((v) => {
          productsSold += v.sold || 0;
          productsTotal += (v.stock || 0) + (v.sold || 0);
        }));
        const productsRemaining = productsTotal - productsSold;

        const transactionResp = await getAllTransactions();
        const transactions = transactionResp?.data || [];
        const now = new Date();
        let daily = 0, weekly = 0, monthly = 0, yearly = 0, newOrders = 0;

        transactions.forEach((t) => {
          if (!t.created_at || t.status !== "successful") return;
          const createdAt = new Date(t.created_at);
          const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);
          const amount = parseFloat(t.amount || 0);
          yearly += amount;
          if (diffDays <= 30) monthly += amount;
          if (diffDays <= 7) weekly += amount;
          if (diffDays <= 1) {
            daily += amount;
            newOrders += 1;
          }
        });

        const yesterdayOrders = transactions.filter((t) => {
          if (!t.created_at || t.status !== "successful") return false;
          const diffDays = (now - new Date(t.created_at)) / (1000 * 60 * 60 * 24);
          return diffDays > 1 && diffDays <= 2;
        }).length;

        const newOrderGrowth = yesterdayOrders > 0
          ? (((newOrders - yesterdayOrders) / yesterdayOrders) * 100).toFixed(1)
          : newOrders > 0 ? 100 : 0;

        setStats({ totalOrders, customers, productsTotal, productsSold, productsRemaining, newOrders, newOrderGrowth });
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

  if (loading) return <p className="text-center text-gray-500 py-10">Loading dashboard...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="space-y-7 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Overview's</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1  md:grid-cols-4 gap-3">
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<FaShoppingCart size={28} />} gradient="bg-gradient-to-br from-purple-500 to-indigo-600" />
        <StatCard title="Customers" value={stats.customers} icon={<FaUsers size={28} />} gradient="bg-gradient-to-br from-blue-500 to-cyan-600" />
        <StatCard title="Products" value={stats.productsTotal} icon={<FaBoxOpen size={28} />} gradient="bg-gradient-to-br from-green-500 to-emerald-600" />
        <StatCard title="Revenue" value={formatAmount(revenueData.yearly)} icon={<FaDollarSign size={28} />} gradient="bg-gradient-to-br from-yellow-400 to-orange-500" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
        <ProductsCard total={stats.productsTotal} sold={stats.productsSold} remaining={stats.productsRemaining} />
        <RevenueCard revenueData={revenueData} />

        <div className="grid grid-cols-1 gap-3">
          <NewOrdersCard newOrders={stats.newOrders} percentage={stats.newOrderGrowth} />
          <OrdersStatusOverview orders={orders} />
        </div>

        <TransactionsOverview revenueData={revenueData} />
      </div>
    </div>
  );
}
