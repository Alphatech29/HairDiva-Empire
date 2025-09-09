// AddProduct.js
import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiChevronDown } from "react-icons/fi";
import SweetAlert from "../../utilitys/sweetAlert";
import { addHairProduct } from "../../utilitys/products";

// ---------------- CustomDropdown ----------------
const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className="border px-4 py-2 rounded-xl shadow-sm cursor-pointer flex justify-between items-center focus:ring-2 focus:ring-primary-400"
        onClick={() => setOpen(!open)}
      >
        <span>{value || placeholder}</span>
        <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className="px-4 py-2 hover:bg-primary-100 cursor-pointer"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------------- ImageUploader ----------------
const ImageUploader = ({ onFileSelect }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPG, and JPEG files are allowed.");
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  return (
    <div
      onClick={() => document.getElementById("fileInput").click()}
      className="border-2 border-dashed border-gray-300 rounded-xl p-6 py-32 text-center cursor-pointer hover:border-primary-400 transition relative w-full"
    >
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Preview"
          className="mx-auto rounded-xl object-cover w-full max-w-md h-48 md:h-64 border shadow-sm"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <p className="mb-2 font-medium">Drop your images here, or click to browse</p>
          <p className="text-xs">1600 x 1200 recommended. PNG, JPG, JPEG allowed.</p>
        </div>
      )}
      <input
        id="fileInput"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );
};

// ---------------- VariantsTable ----------------
const VariantsTable = ({ variants, errors, onVariantChange, addVariant, removeVariant }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Variants</h3>
      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Size</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Stock</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price (₦)</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Old Price (₦)</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {variants.map((variant, index) => {
              const stockNum = parseInt(variant.stock) || 0;
              const lowStock = stockNum > 0 && stockNum <= 5;

              return (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      placeholder="Size"
                      value={variant.size}
                      onChange={(e) => onVariantChange(index, "size", e.target.value)}
                      className="w-full border px-2 py-1 rounded-lg shadow-sm"
                    />
                    {errors[`size_${index}`] && <p className="text-red-600 text-xs">{errors[`size_${index}`]}</p>}
                  </td>
                  <td className="px-2 py-2 flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Stock"
                      value={variant.stock}
                      onChange={(e) => onVariantChange(index, "stock", e.target.value)}
                      className="w-full border px-2 py-1 rounded-lg shadow-sm"
                    />
                    {lowStock && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Low
                      </span>
                    )}
                    {errors[`stock_${index}`] && <p className="text-red-600 text-xs">{errors[`stock_${index}`]}</p>}
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      placeholder="Price"
                      value={variant.price}
                      onChange={(e) => onVariantChange(index, "price", e.target.value)}
                      className="w-full border px-2 py-1 rounded-lg shadow-sm"
                    />
                    {errors[`price_${index}`] && <p className="text-red-600 text-xs">{errors[`price_${index}`]}</p>}
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      placeholder="Old Price"
                      value={variant.oldPrice}
                      onChange={(e) => onVariantChange(index, "oldPrice", e.target.value)}
                      className="w-full border px-2 py-1 rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="px-2 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full transition"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addVariant}
        className="mt-3 flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium"
      >
        <FiPlus /> Add Variant
      </button>
    </div>
  );
};

// ---------------- AddProduct ----------------
export default function AddProduct() {
  const categories = ["Wigs", "Luxury Hair", "Human Hair", "Others", "Night Wears"];
  const tags = ["New", "Sale", "Popular", "Hot"];

  const [variants, setVariants] = useState([{ size: "", stock: "", price: "", oldPrice: "" }]);
  const [product, setProduct] = useState({ name: "", category: "", color: "", tag: "", image: null, description: "" });
  const [errors, setErrors] = useState({});
  const [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    setTotalStock(variants.reduce((sum, v) => sum + (parseInt(v.stock) || 0), 0));
  }, [variants]);

  const handleVariantChange = (i, field, value) =>
    setVariants((prev) => prev.map((v, idx) => (idx === i ? { ...v, [field]: value } : v)));

  const addVariant = () => setVariants((prev) => [...prev, { size: "", stock: "", price: "", oldPrice: "" }]);
  const removeVariant = (i) => setVariants((prev) => prev.filter((_, idx) => idx !== i));
  const handleInputChange = (field, value) => setProduct((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Product Name is required";
    if (!product.category) newErrors.category = "Category is required";
    if (!product.color.trim()) newErrors.color = "Color is required";
    if (!product.description.trim()) newErrors.description = "Description is required";
    if (!product.image) newErrors.image = "Product image is required";

    variants.forEach((v, i) => {
      if (!v.size.trim()) newErrors[`size_${i}`] = "Size is required";
      if (!v.stock || parseInt(v.stock) < 0) newErrors[`stock_${i}`] = "Stock must be >= 0";
      if (!v.price || parseFloat(v.price) <= 0) newErrors[`price_${i}`] = "Price must be > 0";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const formData = new FormData();

      const productData = {
        product_name: product.name.trim(),
        hair_type: product.category,
        color: product.color.trim(),
        tag: product.tag,
        description: product.description.trim(),
      };

      const variantsData = variants.map((v) => ({
        length: v.size.trim(),
        price: parseFloat(v.price),
        old_price: v.oldPrice ? parseFloat(v.oldPrice) : null,
        stock: parseInt(v.stock, 10),
        sold: 0,
      }));

      formData.append("product", JSON.stringify(productData));
      formData.append("variants", JSON.stringify(variantsData));
      if (product.image) formData.append("image", product.image);

      console.log("Submitting product:", { productData, variantsData, image: product.image });

      const response = await addHairProduct(formData);

      if (response.success) {
        SweetAlert.alert("Success", response.message, "success");
        setProduct({ name: "", category: "", color: "", tag: "", image: null, description: "" });
        setVariants([{ size: "", stock: "", price: "", oldPrice: "" }]);
        setErrors({});
      } else {
        SweetAlert.alert("Error", response.message, "error");
      }
    } catch (err) {
      console.error("Error submitting product:", err);
      SweetAlert.alert("Error", err.message || "Something went wrong.", "error");
    }
  };

  return (
    <div className="py-4 min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-4 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Add New Product</h2>

        {/* Image */}
        <ImageUploader onFileSelect={(file) => handleInputChange("image", file)} />
        {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}

        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border rounded-xl px-4 py-2 w-full"
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <CustomDropdown
              options={categories}
              value={product.category}
              onChange={(val) => handleInputChange("category", val)}
              placeholder="Select Category"
            />
            {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Color</label>
            <input
              type="text"
              value={product.color}
              onChange={(e) => handleInputChange("color", e.target.value)}
              className="border rounded-xl px-4 py-2 w-full"
              placeholder="Enter color e.g. Black"
            />
            {errors.color && <p className="text-red-600 text-sm">{errors.color}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Tag</label>
            <CustomDropdown
              options={tags}
              value={product.tag}
              onChange={(val) => handleInputChange("tag", val)}
              placeholder="Select Tag"
            />
          </div>
        </div>

        {/* Variants Table */}
        <VariantsTable
          variants={variants}
          errors={errors}
          onVariantChange={handleVariantChange}
          addVariant={addVariant}
          removeVariant={removeVariant}
        />

        {/* Total Stock */}
        <div>
          <span className="font-semibold text-gray-700">
            Total Stock:{" "}
            <span className={`${totalStock <= 5 ? "text-red-600" : "text-green-600"}`}>{totalStock}</span>
          </span>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            placeholder="Enter product description"
            value={product.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-primary-400 shadow-sm min-h-[150px]"
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-primary-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-500 transition font-medium"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
