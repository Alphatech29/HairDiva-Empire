const pool = require("../model/db");

// Create a new service
const createService = async (serviceData) => {
  const { serviceName, price } = serviceData;

  try {
    const [result] = await pool.query(
      `INSERT INTO services (service_name, price) VALUES (?, ?)`,
      [serviceName, price]
    );

    return {
      success: true,
      message: "Service created successfully",
      data: { id: result.insertId, serviceName },
    };
  } catch (err) {
    console.error("Error creating service:", err.message);
    return { success: false, message: err.message };
  }
};

// Get all services
const getAllServices = async () => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM services ORDER BY created_at DESC`
    );

    return { success: true, message: "Services retrieved successfully", data: rows };
  } catch (err) {
    console.error("Error fetching services:", err.message);
    return { success: false, message: err.message };
  }
};

// Update a service by ID
const updateServiceById = async (id, serviceData) => {
  const { serviceName, price } = serviceData;

  try {
    const [result] = await pool.query(
      `UPDATE services SET service_name = ?, price = ? WHERE service_id = ?`,
      [serviceName, price, id]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "Service not found" };
    }

    return { success: true, message: "Service updated successfully" };
  } catch (err) {
    console.error("Error updating service:", err.message);
    return { success: false, message: err.message };
  }
};

// Delete a service by ID
const deleteServiceById = async (id) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM services WHERE service_id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "Service not found" };
    }

    return { success: true, message: "Service deleted successfully" };
  } catch (err) {
    console.error("Error deleting service:", err.message);
    return { success: false, message: err.message };
  }
};

// Get a service by ID
const getServiceById = async (id) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM services WHERE service_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return { success: false, message: "Service not found" };
    }

    return { success: true, message: "Service retrieved successfully", data: rows[0] };
  } catch (err) {
    console.error("Error fetching service by ID:", err.message);
    return { success: false, message: err.message };
  }
};

module.exports = {
  createService,
  getAllServices,
  updateServiceById,
  deleteServiceById,
  getServiceById,
};
