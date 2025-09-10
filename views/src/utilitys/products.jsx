import axios from "axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get("/api/products", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const products =
      response.data?.success && Array.isArray(response.data.data)
        ? response.data.data
        : [];

    const formattedProducts = products.map(product => ({
      ...product,
      variants: Array.isArray(product.variants)
        ? product.variants.map(variant => ({
            ...variant,
            price: variant.price.toString(),
            old_price: variant.old_price?.toString() || null,
          }))
        : [],
    }));

    return {
      success: true,
      message: "Products retrieved successfully!",
      data: formattedProducts,
    };
  } catch (error) {
    console.error(
      "Fetching products failed:",
      error.response?.data || error.message
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while fetching products.",
      error: error.response?.data || error.message,
    };
  }
};


export const getProductById = async (id) => {
  try {
    const response = await axios.get(`/api/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const product =
      response.data.success && response.data.data
        ? response.data.data
        : null;

    if (product) {
      product.variants = Array.isArray(product.variants) ? product.variants : [];
    }

    return {
      success: true,
      message: "Product retrieved successfully!",
      data: product,
    };
  } catch (error) {
    console.error(
      `Fetching product with ID ${id} failed:`,
      error.response?.data || error.message
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        `An error occurred while fetching product with ID ${id}.`,
      error: error.response?.data || error.message,
    };
  }
};



// Delete a product by ID
export const deleteProductById = async (id) => {
  try {
    const response = await axios.delete(`/api/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedProduct =
      response.data.success && response.data.data
        ? response.data.data
        : null;

    return {
      success: true,
      message: `Product deleted successfully!`,
      data: deletedProduct,
    };
  } catch (error) {
    console.error(
      `Deleting product failed:`,
      error.response?.data || error.message
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        `An error occurred while deleting product with ID ${id}.`,
      error: error.response?.data || error.message,
    };
  }
};

export const addHairProduct = async (formData) => {
  try {
    const response = await axios.post("/api/add-products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      success: true,
      message: response.data?.message || "Product added successfully",
      data: response.data?.data || null,
    };
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    const serverData = error.response?.data;

    console.error("Adding hair product failed:", serverMessage || error.message);

    return {
      success: false,
      message: serverMessage || "Failed to add product",
      error: serverData || error.message,
    };
  }
};


export const updateHairProduct = async (productId, formData) => {
  if (!productId) {
    return {
      success: false,
      message: "Product ID is required for update",
    };
  }

  try {
    const response = await axios.put(`/api/update-products/${productId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Extract backend response safely
    const resData = response.data || {};
    const success = resData.success === true;
    const message = resData.message || (success ? "Product updated successfully" : "Failed to update product");
    const data = resData.data || null;

    return {
      success,
      message,
      data,
    };
  } catch (error) {
    // Extract backend error messages if available
    const serverData = error.response?.data || {};
    const serverMessage = serverData.message || error.message || "Something went wrong";

    console.error("Updating hair product failed:", serverMessage);

    return {
      success: false,
      message: serverMessage,
      error: serverData || error.message,
    };
  }
};

