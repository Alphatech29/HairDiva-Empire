// services/transactions.js
import axios from "axios";

export const getAllTransactions = async () => {
  try {
    const response = await axios.get("/api/transaction", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const transactions =
      response.data?.success && Array.isArray(response.data.data)
        ? response.data.data
        : [];

    return {
      success: true,
      message: "Transactions retrieved successfully!",
      data: transactions,
    };
  } catch (error) {
    console.error(
      "Fetching transactions failed:",
      error.response?.data || error.message
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while fetching transactions.",
      error: error.response?.data || error.message,
    };
  }
};
