import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FiArrowLeft, FiUser, FiTruck, FiPackage, FiFileText } from "react-icons/fi";
import { getOrderByNumber, updateOrderStatus } from "../../utilitys/order";
import { formatDateTime } from "../../utilitys/formatDate";
import { formatAmount } from "../../utilitys/formatAmount";
import SweetAlert from "../../utilitys/sweetAlert";

const statusColors = {
  pending: "bg-yellow-100/80 text-yellow-700 border border-yellow-200 shadow-sm",
  paid: "bg-green-100/80 text-green-700 border border-green-200 shadow-sm",
  shipped: "bg-blue-100/80 text-blue-700 border border-blue-200 shadow-sm",
  completed: "bg-purple-100/80 text-purple-700 border border-purple-200 shadow-sm",
  cancelled: "bg-red-100/80 text-red-700 border border-red-200 shadow-sm",
  default: "bg-gray-100/80 text-gray-600 border border-gray-200 shadow-sm",
};

const toTitleCase = (str) =>
  str ? str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()) : "";

const nextStatus = {
  pending: "paid",
  paid: "shipped",
  shipped: "completed",
  completed: "completed",
};

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrderByNumber(id);
      if (result.success) {
        setOrder(result.order || result.data);
      } else {
        setError(result.message || "Failed to load order details");
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  const handleToggleStatus = async () => {
    if (!order || order.status === "completed" || order.status === "cancelled") return;

    const newStatus = nextStatus[order.status];
    setUpdating(true);

    try {
      const result = await updateOrderStatus(order.order_number, newStatus);
      if (result.success) {
        setOrder((prev) => ({
          ...prev,
          status: newStatus,
        }));
        SweetAlert.alert(
          "Status Updated",
          `Order status successfully updated to ${toTitleCase(newStatus)}`,
          "success"
        );
      } else {
        SweetAlert.alert("Failed", result.message || "Failed to update status", "error");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      SweetAlert.alert("Error", "There was an error updating the order status", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order || order.status === "completed" || order.status === "cancelled") return;

    SweetAlert.confirm(
      "Are you sure?",
      "This will cancel the order and cannot be undone.",
      "warning"
    ).then(async (confirmed) => {
      if (!confirmed) return;

      setUpdating(true);
      try {
        const result = await updateOrderStatus(order.order_number, "cancelled");
        if (result.success) {
          setOrder((prev) => ({
            ...prev,
            status: "cancelled",
            cancelled_at: new Date().toISOString(),
          }));
          SweetAlert.alert("Cancelled", "Order has been cancelled", "success");
        } else {
          SweetAlert.alert("Failed", result.message || "Failed to cancel order", "error");
        }
      } catch (err) {
        console.error("Error cancelling order:", err);
        SweetAlert.alert("Error", "There was an error cancelling the order", "error");
      } finally {
        setUpdating(false);
      }
    });
  };

  if (loading) return <p className="text-gray-500 animate-pulse">Loading order details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!order) return <p className="text-gray-500">No order found</p>;

  // Timeline logic
  let timelineSteps = [];
  if (order.cancelled_at) {
    timelineSteps.push({ label: "Cancelled", date: order.cancelled_at, color: "bg-red-400" });
  } else {
    timelineSteps = [
      { label: "Pending", date: order.pending_at, color: "bg-yellow-400" },
      { label: "Paid", date: order.paid_at, color: "bg-green-400" },
      { label: "Shipped", date: order.shipped_at, color: "bg-blue-700" },
      { label: "Completed", date: order.completed_at, color: "bg-purple-900" },
    ];
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <NavLink
        to="/store/orders"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-all"
      >
        <FiArrowLeft className="mr-2" /> Back to Orders
      </NavLink>

      {/* Order Header */}
      <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Order #{order.order_number}</h2>
          <p className="text-sm text-gray-500 mt-1">Placed on {formatDateTime(order.pending_at)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md ${
              statusColors[order.status] || statusColors.default
            }`}
          >
            {toTitleCase(order.status)}
          </span>

          {/* Toggle Status Buttons */}
          {order.status !== "completed" && order.status !== "cancelled" && (
            <>
              <button
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                disabled={updating}
                onClick={handleToggleStatus}
              >
                {updating ? "Updating..." : `Move to ${toTitleCase(nextStatus[order.status])}`}
              </button>

              <button
                className="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                disabled={updating}
                onClick={handleCancelOrder}
              >
                {updating ? "Cancelling..." : "Cancel Order"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Customer & Shipping Info */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 transition">
          <div className="flex items-center mb-3">
            <FiUser className="text-indigo-500 mr-2 text-lg" />
            <h3 className="text-lg font-semibold text-gray-800">Customer Info</h3>
          </div>
          <p><strong>Name:</strong> {toTitleCase(order.customer_name)}</p>
          <p><strong>Email:</strong> {order.customer_email}</p>
          <p><strong>Phone:</strong> {order.customer_phone}</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 flex flex-col transition">
          <div className="flex items-center mb-3">
            <FiTruck className="text-green-500 mr-2 text-lg" />
            <h3 className="text-lg font-semibold text-gray-800">Shipping Info</h3>
          </div>
          <p>{toTitleCase(order.shipping_address)}</p>
          <p>{toTitleCase(order.shipping_city)}, {toTitleCase(order.shipping_state)}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mt-7 bg-white/70 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <FiPackage className="text-purple-500 mr-2 text-lg" />
          <h3 className="text-lg font-semibold text-gray-800">Items</h3>
        </div>
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-700 border-b">
                <th className="p-3">S/N</th>
                <th className="p-3">Barcode</th>
                <th className="p-3">Product</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Price</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, idx) => (
                <tr
                  key={idx}
                  className={`text-sm transition ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50/40`}
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{item.barcode}</td>
                  <td className="p-3 flex items-center gap-3">
                    <img src={item.image_url} alt={item.product_name} className="w-12 h-12 object-cover rounded-lg" />
                    <div>
                      <p className="font-medium text-gray-800">{item.product_name}</p>
                      <p className="text-xs text-gray-500">Color: {item.color} | Length: {item.length}</p>
                    </div>
                  </td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{formatAmount(item.unit_price)}</td>
                  <td className="p-3 font-medium text-gray-800">{formatAmount(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Summary + Timeline */}
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
          <div className="flex items-center mb-3">
            <FiFileText className="text-indigo-600 mr-2 text-lg" />
            <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
          </div>
          <div className="space-y-2 text-gray-700">
            <p><strong>Subtotal:</strong> {formatAmount(order.subtotal)}</p>
            <p><strong>Shipping:</strong> {formatAmount(order.shipping_cost)}</p>
            <p><strong>VAT:</strong> {formatAmount(order.vat_amount)}</p>
            <p><strong>Discount:</strong> {formatAmount(order.discount)}</p>
          </div>
          <p className="text-2xl font-extrabold mt-5 text-indigo-700 tracking-tight">
            Total: {formatAmount(order.total)}
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm relative">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h3>
          <div className="flex flex-col gap-4 relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-1 bg-gray-200 rounded-full"></div>
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 relative">
                <div
                  className={`w-3 h-3 rounded-full mt-1 ${step.date ? step.color : "bg-gray-300"} shadow-md`}
                ></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{step.label}</p>
                  <p className="text-xs text-gray-500">{step.date ? formatDateTime(step.date) : "Pending"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
