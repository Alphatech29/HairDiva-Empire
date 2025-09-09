import axios from "axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get("/api/products", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Ensure we have a proper array of products
    const products =
      response.data?.success && Array.isArray(response.data.data)
        ? response.data.data
        : [];

    // Optional: convert variant prices to strings (if needed)
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

    console.log("Fetched products:", formattedProducts);

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