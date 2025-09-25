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
