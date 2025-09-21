import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrdersTable from "../../components/ordersTable";
import { getAllOrders } from "../../utilitys/order";

const statusColors = {
  paid: "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium",
  shipped: "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium",
  completed: "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium",
  pending: "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium",
  cancelled: "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium",
  default: "bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium",
};

const toTitleCase = (str) =>
  str ? str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()) : "";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getAllOrders();

      if (result.success) {
        const formattedOrders = result.orders
          .map((order) => ({
            id: order.order_number,
            customer: toTitleCase(order.customer_name),
            city: toTitleCase(order.shipping_city),
            state: toTitleCase(order.shipping_state),
            date: order.pending_at,
            status: order.status,
            total: parseFloat(order.total),
          }))
          .sort((a, b) => b.date - a.date);

        setOrders(formattedOrders);
      } else {
        setError(result.message || "Failed to load orders");
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  // ✅ handle edit outside
  const handleEdit = (order) => {
    navigate(`/store/order/${order.id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-3">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <OrdersTable
          orders={orders}
          statusColors={statusColors}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Orders;
