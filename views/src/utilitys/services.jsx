import axios from "axios";

// Create a new service
export const createService = async (serviceData) => {
  try {
    const response = await axios.post("/api/create-service", serviceData, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: response.data?.success || false,
      message: response.data?.message,
      serviceId: response.data?.data?.id || null,
      serviceName: response.data?.data?.serviceName || null,
    };
  } catch (error) {
    console.error("Service creation failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Server error",
      error: error.response?.data || error.message,
    };
  }
};

// Fetch all services
export const fetchServices = async () => {
  try {
    const response = await axios.get("/api/all-services", {
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: response.data?.success || false,
      message: response.data?.message,
      services: response.data?.data || [],
    };
  } catch (error) {
    console.error("Fetching services failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Server error",
      error: error.response?.data || error.message,
      services: [],
    };
  }
};

// Update a service by ID
export const updateServiceById = async (id, serviceData) => {
  try {
    const response = await axios.put(`/api/services/${id}`, serviceData, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: response.data?.success || false,
      message: response.data?.message,
    };
  } catch (error) {
    console.error("Updating service failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Server error",
      error: error.response?.data || error.message,
    };
  }
};

// Delete a service by ID
export const deleteServiceById = async (id) => {
  try {
    const response = await axios.delete(`/api/services/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: response.data?.success || false,
      message: response.data?.message,
    };
  } catch (error) {
    console.error("Deleting service failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Server error",
      error: error.response?.data || error.message,
    };
  }
};
