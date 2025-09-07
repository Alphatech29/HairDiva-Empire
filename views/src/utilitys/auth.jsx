import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `/api/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userData = response.data.data || null;

    console.log("Login response:", response.data);

    return {
      success: response.data.success,
      message: response.data.message,
      data: userData,
    };
  } catch (error) {
    console.error("Login failed:", error.response?.data);

    return {
      success: false,
      message: error.response?.data?.message,
      error: error.response?.data,
    };
  }
};

