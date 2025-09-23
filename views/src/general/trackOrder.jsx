import { useState } from "react";
import { getOrderByNumber } from "../utilitys/order";
import { formatDateTime } from "../utilitys/formatDate";

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stagesOrder = [
    { key: "pending_at", label: "Order Placed" },
    { key: "paid_at", label: "Processing" },
    { key: "shipped_at", label: "Shipped" },
    { key: "completed_at", label: "Delivered" },
  ];

  const fetchOrder = async () => {
    if (!orderNumber.trim()) {
      setError("Please enter an order number");
      return;
    }

    setLoading(true);
    setError(null);
    setOrderData(null);

    try {
      const response = await getOrderByNumber(orderNumber);
      if (response?.success && response.data) {
        setOrderData(response.data);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  const getStageColor = (key) => {
    if (!orderData) return "bg-gray-300";
    if (orderData[key]) return "bg-green-500";
    if ((key === "paid_at" && orderData.status === "paid") || (key === "shipped_at" && orderData.status === "shipped"))
      return "bg-yellow-500 animate-pulse";
    return "bg-gray-300";
  };

  const safeFormatDate = (date) => {
    if (!date) return "Pending";
    return formatDateTime(date);
  };

  const getOpacity = (key) => {
    if (!orderData) return "opacity-50";
    return orderData[key] ? "opacity-100" : "opacity-50";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 py-40 bg-gradient-to-t from-purple-100 via-yellow-50 to-purple-950 text-purple-100">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          {orderData && (
            <p className="text-gray-500 mt-2">
              Order ID: <span className="font-semibold text-gray-800">{orderData.order_number}</span>
            </p>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2 justify-center">
          <input
            type="text"
            placeholder="Enter order number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={fetchOrder}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {loading ? "Loading..." : "Track"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {/* Timeline Bottom-Up */}
        {orderData && (
          <div className="relative ml-6 flex flex-col-reverse space-y-6 space-y-reverse">
            {stagesOrder.map((stage, idx) => {
              const color = getStageColor(stage.key);
              const nextStage = stagesOrder[idx + 1];
              const opacityClass = getOpacity(stage.key);

              return (
                <div key={stage.key} className={`relative ${opacityClass}`}>
                  {/* Dot */}
                  <div
                    className={`absolute w-4 h-4 rounded-full -left-[9px] top-2 ${color}`}
                  ></div>

                  {/* Line to next dot */}
                  {nextStage && orderData[stage.key] && (
                    <div
                      className="absolute left-1.5 top-3 w-1 bg-green-500"
                      style={{ height: "calc(100% + 1rem)" }}
                    ></div>
                  )}

                  {/* Stage content */}
                  <div className="bg-gray-50 p-4 rounded-xl shadow-sm ml-6">
                    <h3 className="text-lg font-semibold text-gray-800">{stage.label}</h3>
                    <p
                      className={`text-sm font-medium ${
                        color.includes("green")
                          ? "text-green-600"
                          : color.includes("yellow")
                          ? "text-yellow-600"
                          : "text-gray-500"
                      }`}
                    >
                      {safeFormatDate(orderData[stage.key])}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Summary with ToolTip */}
        {orderData && (
          <div className="bg-gray-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <ul className="space-y-2 text-gray-700">
              {orderData.items.map((item) => (
                <li key={item.id} className="flex justify-between items-center group relative">
                  <span className="truncate max-w-[70%] line-clamb-1" title={item.product_name}>
                    {item.product_name}
                  </span>
                  <span>{item.quantity} x ₦{item.unit_price}</span>
                
                  <div className="absolute left-0 -top-6 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg">
                    {item.product_name}
                  </div>
                </li>
              ))}
              <li className="flex justify-between font-semibold border-t pt-2 mt-2">
                <span>Total:</span>
                <span>₦{orderData.total}</span>
              </li>
            </ul>
          </div>
        )}

        {/* Delivery Info & Support */}
        {orderData && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Normally, your package will arrive within 1–5 working days after placing your order. In case of weather disasters or holidays, there may be delays.
            </p>
            <p className="text-gray-600">
              For any questions, please contact{" "}
              <a href="mailto:support@hairdivaempire.com" className="text-blue-600">
                support@hairdivaempire.com
              </a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
