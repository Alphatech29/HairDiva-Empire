import { useState, useEffect } from "react";
import { getAllProducts } from "../../utilitys/products";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function ProductInventoryResponsive() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProducts();
      if (result.success) setProducts(result.data || []);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    searchQuery
      ? product.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="py-4">
      <div className="flex flex-col justify-between sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-xl px-3 py-2 flex-1 max-w-[150px] sm:min-w-[250px]"
        />
        <NavLink
          to="/store/products/add"
          className="bg-primary-500 text-white px-4 py-2 rounded-xl whitespace-nowrap w-full sm:w-auto"
        >
          Add Product
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4">
        {filteredProducts.map((product, index) => {
          const totalStock =
            product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
          const totalSold =
            product.variants?.reduce((sum, v) => sum + v.sold, 0) || 0;
          const sizes =
            product.variants?.map((v) => v.length).join(", ") || "-";
          const firstVariant = product.variants?.[0] || {};
          const price = firstVariant.price || "-";
          const status = totalStock > 0 ? "In-stock" : "Out-of-stock";
          const statusColor =
            totalStock > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800";

          return (
            <div
              key={product.id}
              className="bg-white border rounded-xl shadow-sm p-4 flex flex-col hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-gray-500">{index + 1}.</span>
                <img
                  src={product.image_url || "/placeholder.jpg"}
                  alt={product.product_name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-sm sm:text-base">
                    {product.product_name}
                  </span>
                  <span className="text-xs text-gray-400">Size: {sizes}</span>
                  <span
                    className={`mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2 text-xs sm:text-sm text-gray-700">
                <div>₦{price}</div>
                <div>
                  <span>{totalStock} Left</span> / <span>{totalSold} Sold</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-3 text-xs sm:text-sm text-gray-500">
                <span>Category: {product.hair_type || "-"}</span>
                <span className="text-yellow-500">★ 4.5</span>
              </div>

              <div className="flex gap-2 mt-auto flex-wrap">
                <button
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg flex-1 text-xs sm:text-sm"
                  title="View"
                >
                  <FiEye size={16} className="text-gray-600" />
                </button>
                <button
                  className="bg-orange-100 hover:bg-orange-200 p-2 rounded-lg flex-1 text-xs sm:text-sm"
                  title="Edit"
                >
                  <FiEdit size={16} className="text-orange-600" />
                </button>
                <button
                  className="bg-red-100 hover:bg-red-200 p-2 rounded-lg flex-1 text-xs sm:text-sm"
                  title="Delete"
                >
                  <FiTrash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                S/N
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Product
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Stock
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product, index) => {
              const totalStock =
                product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
              const totalSold =
                product.variants?.reduce((sum, v) => sum + v.sold, 0) || 0;
              const sizes =
                product.variants?.map((v) => v.length).join(", ") || "-";
              const firstVariant = product.variants?.[0] || {};
              const price = firstVariant.price || "-";
              const status = totalStock > 0 ? "In-stock" : "Out-of-stock";
              const statusColor =
                totalStock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800";

              return (
                <tr key={product.id}>
                  <td className="px-4 py-2 font-medium text-sm">{index + 1}</td>
                  <td className="px-4 py-2 flex items-center gap-3 w-80 ">
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      className="w-12 h-12 object-cover rounded"
                    />

                    <div className="flex flex-col gap-2 items-start justify-start">
                      <span className="font-medium text-sm line-clamp-2">
                        {product.product_name}
                      </span>
                      <span className="text-gray-400 text-xs text-start">
                        Size: {sizes}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col items-start justify-start">
                      <span className="font-medium text-sm">
                        {totalStock} Left
                      </span>
                      <span className="text-gray-400 text-xs text-start">
                        {totalSold} Sold
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 font-medium text-sm">₦{price}</td>
                  <td className="px-4 py-2 font-medium text-sm">
                    {product.hair_type || "-"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
                      title="View"
                    >
                      <FiEye size={16} className="text-gray-600" />
                    </button>
                    <button
                      className="bg-orange-100 hover:bg-orange-200 p-2 rounded-lg"
                      title="Edit"
                    >
                      <FiEdit size={16} className="text-orange-600" />
                    </button>
                    <button
                      className="bg-red-100 hover:bg-red-200 p-2 rounded-lg"
                      title="Delete"
                    >
                      <FiTrash2 size={16} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
