import { FiEdit, FiTrash2 } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function ProductTable({ products, loadingDeleteId, handleDelete }) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">S/N</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Barcode</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Product</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Stock</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => {
            const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
            const totalSold = product.variants?.reduce((sum, v) => sum + v.sold, 0) || 0;
            const sizes = product.variants?.map((v) => v.length).join(", ") || "-";
            const firstVariant = product.variants?.[0] || {};
            const price = firstVariant.price || "-";
            const status = totalStock > 0 ? "In-stock" : "Out-of-stock";
            const statusColor =
              totalStock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

            return (
              <tr key={product.id}>
                <td className="px-4 py-2 font-medium text-sm">{index + 1}</td>
                <td className="px-4 py-2 font-medium text-sm">{product.barcode || "-"}</td>
                <td className="px-4 py-2 flex items-center gap-3 w-80">
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex flex-col gap-2 items-start justify-start">
                    <span className="font-medium text-[12px] line-clamp-2">{product.product_name}</span>
                    <span className="text-gray-400 text-xs text-start">Size: {sizes}</span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-col items-start justify-start">
                    <span className="font-medium text-[12px]">{totalStock} Left</span>
                    <span className="text-gray-400 text-xs text-start">{totalSold} Sold</span>
                  </div>
                </td>
                <td className="px-4 py-2 font-medium text-[12px]">₦{price}</td>
                <td className="px-4 py-2 font-medium text-[12px]">{product.hair_type || "-"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <NavLink
                    to={`/store/products/edit/${product.id}`}
                    className="bg-orange-100 hover:bg-orange-200 p-2 rounded-lg flex-1 text-xs sm:text-sm flex items-center justify-center"
                    title="Edit"
                  >
                    <FiEdit size={16} className="text-orange-600" />
                  </NavLink>

                  <button
                    className="bg-red-100 hover:bg-red-200 p-2 rounded-lg"
                    title="Delete"
                    onClick={() => handleDelete(product.id)}
                    disabled={loadingDeleteId === product.id}
                  >
                    <FiTrash2
                      size={16}
                      className={`text-red-600 ${
                        loadingDeleteId === product.id ? "animate-pulse" : ""
                      }`}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
