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
