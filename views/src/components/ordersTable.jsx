import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { formatDateTime } from "../utilitys/formatDate";
import { formatAmount } from "../utilitys/formatAmount";

const OrdersTable = ({ orders, statusColors, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
        <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
          <tr>
            <th className="px-6 py-3">S/N</th>
            <th className="px-6 py-3">Order No</th>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Total ($)</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {[...orders].reverse().map((order, index) => (
            <tr
              key={order.id}
              className="bg-white hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium">{index + 1}</td>
              <td className="px-6 py-4 font-medium">#{order.id}</td>
              <td className="px-6 py-4 line-clamp-1">{order.customer}</td>
              <td className="px-6 py-4">{formatDateTime(order.date)}</td>
              <td className="px-6 py-4">
                <span
                  className={statusColors[order.status] || statusColors.default}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4">
                {formatAmount(order.total.toFixed(2))}
              </td>
              <td className="px-6 py-4 text-center space-x-2">
                {/* Edit button */}
                <button
                  onClick={() => onEdit && onEdit(order)}
                  className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium text-orange-600 bg-orange-100 hover:bg-orange-200 rounded-lg"
                >
                  <FiEdit size={16} className="text-orange-600" />
                </button>

                {/* Delete button */}
                <button
                  onClick={() => onDelete && onDelete(order)}
                  className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 hover:bg-red-200 rounded-lg"
                >
                  <FiTrash2 size={16} className="text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
