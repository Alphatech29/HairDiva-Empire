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

const getAllAppointments = async () => {
  try {
    const [rows] = await pool.query(
      `SELECT
         a.id,
         a.full_name,
         a.email,
         a.phone,
         a.whatsapp,
         a.address,
         a.service_id,
         DATE_FORMAT(a.appointment_date, '%Y-%m-%d') AS appointment_date,
         a.appointment_time AS appointment_time,
         a.amount,
         a.message,
         a.status,
         a.payment_status,
         a.payment_method,
         s.service_name
       FROM appointments a
       LEFT JOIN services s ON a.service_id = s.service_id
       ORDER BY a.appointment_date DESC, STR_TO_DATE(a.appointment_time, '%h:%i %p') DESC`
    );

    return { success: true, data: rows };
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    return { success: false, message: err.message };
  }
};


const updateAppointmentById = async (id, updates) => {
  try {
    const fields = Object.keys(updates);
    if (fields.length === 0) {
      return { success: false, message: "No fields to update" };
    }

    const setString = fields.map((field) => `${field} = ?`).join(", ");
    const values = fields.map((field) => updates[field]);
    values.push(id); // For WHERE clause

    const [result] = await pool.query(
      `UPDATE appointments SET ${setString} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "Appointment not found" };
    }

    return { success: true, message: "Appointment updated successfully" };
  } catch (err) {
    console.error("Error updating appointment:", err.message);
    return { success: false, message: err.message };
  }
};


module.exports = { createAppointment, getAllAppointments, updateAppointmentById };
