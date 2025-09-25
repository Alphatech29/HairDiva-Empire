const pool = require("../model/db");

// Create a new appointment
const createAppointment = async (appointmentData) => {
  const {
    fullName,
    email,
    phone,
    whatsapp,
    address,
    serviceId,
    appointmentDate,
    appointmentTime,
    amount,
    message,
    status = "Pending",
    paymentStatus = "Pending",
    paymentMethod,
  } = appointmentData;

  try {
    const [result] = await pool.query(
      `INSERT INTO appointments
        (full_name, email, phone, whatsapp, address, service_id, appointment_date, appointment_time, amount, message, status, payment_status, payment_method)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        email,
        phone,
        whatsapp || null,
        address || null,
        serviceId,
        appointmentDate,
        appointmentTime,
        amount,
        message || null,
        status,
        paymentStatus,
        paymentMethod
      ]
    );

    return {
      success: true,
      message: "Appointment created successfully",
      data: { id: result.insertId, fullName, email, appointmentDate, appointmentTime }
    };
  } catch (err) {
    console.error("Error creating appointment:", err.message);
    return { success: false, message: err.message };
  }
};

module.exports = { createAppointment };
