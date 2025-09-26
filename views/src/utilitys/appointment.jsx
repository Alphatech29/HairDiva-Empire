import axios from "axios";

// Service to create a new appointment
export const createAppointmentService = async (appointmentData) => {
  try {
    const response = await axios.post("/api/create-appointment", appointmentData, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: response.data?.success || false,
      message: response.data?.message,
      appointmentId: response.data?.data?.id || null,
      appointmentDetails: response.data?.data || null,
      paymentLink: response.data?.paymentLink || null,
    };
  } catch (error) {
    console.error(
      "Appointment creation failed:",
      error.response?.data || error.message
    );

    return {
      success: false,
      message: error.response?.data?.message || "Server error",
      error: error.response?.data || error.message,
      paymentLink: null,
    };
  }
};



// Service to fetch all appointments
export const getAllAppointments = async () => {
  try {
    const response = await axios.get("/api/all-appointment", {
      headers: { "Content-Type": "application/json" },
    });
    
    return response.data;
  } catch (error) {
    console.error(
      "Fetching appointments failed:",
      error.response?.data || error.message
    );

    return {
      success: false,
      message: error.response?.data?.message || "Server error",
      data: [],
      error: error.response?.data || error.message,
    };
  }
};


// Update appointment status
export const updateAppointmentById = async (id, status) => {
  try {
    const response = await axios.put(
      `/api/appointments/${id}`,
      { status },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Updating appointment failed:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Server error",
      error: error.response?.data || error.message,
    };
  }
};