import axios from "axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`/api/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const products =
      response.data.success && Array.isArray(response.data.data)
        ? response.data.data
        : [];

    // Log the products to the console
    console.log("Fetched products:", products);

    return {
      success: true,
      message: "Products retrieved successfully!",
      data: products,
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

// Fetch a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`/api/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const product =
      response.data.success && response.data.data
        ? response.data.data
        : null;

    console.log("Fetched product:", product);

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

