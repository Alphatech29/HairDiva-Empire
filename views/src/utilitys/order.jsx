import axios from "axios";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post("/api/order", orderData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: response.data?.success || false,
      message: response.data?.message,
      paymentLink: response.data?.paymentLink || null,
      orderNumber: response.data?.orderNumber || null,
    };
  } catch (error) {
    console.error("Order creation failed:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Server error",
      error: error.response?.data || error.message,
    };
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get("/api/all-order", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: response.data?.success || false,
      message: response.data?.message,
      orders: response.data?.data || [],
    };
  } catch (error) {
    console.error("Fetching all orders failed:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Server error",
      error: error.response?.data || error.message,
    };
  }
};

// Fetch a single order by order number
export const getOrderByNumber = async (orderNumber) => {
  try {
    const response = await axios.get(`/api/order/${orderNumber}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Fetching order failed:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Server error",
      error: error.response?.data || error.message,
    };
  }
};
