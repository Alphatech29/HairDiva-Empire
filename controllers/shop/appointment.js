const { createAppointment, getAllAppointments, updateAppointmentById } = require("../../utility/appointment");
const { createPaymentLink } = require("../../utility/flutterwave");
const { getServiceById } = require("../../utility/service");
const { getWebsiteSettings } = require("../../utility/general");
const { generateOrderNumber } = require("../../utility/UniqueID");
const { formatDateForMySQL, formatTimeForMySQL } = require("../../utility/dateTime");
const initDB = require("../../model/sqlite");

/**
 * Controller: Initial appointment request
 */
async function appointmentController(req, res) {
  try {
    const appointmentData = req.body;

    // Validate required fields
    if (!appointmentData.fullName || !appointmentData.serviceId || !appointmentData.date || !appointmentData.time) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const serviceResult = await getServiceById(appointmentData.serviceId);
    if (!serviceResult.success) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const serviceAmount = serviceResult.data.price;

    const pendingAppointment = {
      fullName: appointmentData.fullName,
      email: appointmentData.email,
      phone: appointmentData.phone,
      whatsapp: appointmentData.whatsapp,
      address: appointmentData.address,
      serviceId: appointmentData.serviceId,
      appointmentDate: formatDateForMySQL(appointmentData.date),
      appointmentTime: appointmentData.time,
      amount: parseFloat(serviceAmount),
      message: appointmentData.notes,
      paymentMethod: appointmentData.paymentMethod,
    };

    // PAY ONLINE → save as "pending" and create payment link
    if (pendingAppointment.paymentMethod?.toLowerCase() === "pay online") {
      const reference = generateOrderNumber();

      const db = await initDB();
      await db.run(
        `INSERT INTO appointments
          (txRef, fullName, email, phone, whatsapp, address, serviceId, appointmentDate, appointmentTime, amount, message, paymentMethod, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          reference,
          pendingAppointment.fullName,
          pendingAppointment.email,
          pendingAppointment.phone,
          pendingAppointment.whatsapp,
          pendingAppointment.address,
          pendingAppointment.serviceId,
          pendingAppointment.appointmentDate,
          pendingAppointment.appointmentTime,
          pendingAppointment.amount,
          pendingAppointment.message,
          pendingAppointment.paymentMethod,
          "pending",
        ]
      );

      const settingsRows = await getWebsiteSettings();
      const siteUrl = settingsRows[0]?.site_url || "";

      const paymentResponse = await createPaymentLink({
        reference,
        amount: pendingAppointment.amount,
        email: pendingAppointment.email,
        name: pendingAppointment.fullName,
        phone: pendingAppointment.phone,
        redirectUrl: `${siteUrl}/salon/book-appointment?txRef=${reference}`,
        title: `Payment for ${appointmentData.serviceName}`,
        description: `Payment for ${appointmentData.serviceName} service`,
      });

      if (!paymentResponse?.link && !paymentResponse?.authorization_url) {
        return res.status(500).json({ success: false, message: "Failed to create payment link" });
      }

      return res.status(200).json({
        success: true,
        message: "Payment link created, complete payment to confirm appointment",
        paymentLink: paymentResponse.link || paymentResponse.authorization_url,
        txRef: reference,
      });
    }

    // PAY IN SHOP → directly create appointment with status "pending"
    if (pendingAppointment.paymentMethod?.toLowerCase() === "pay in shop") {
      const result = await createAppointment({
        ...pendingAppointment,
        status: "pending",
        paymentStatus: "Pending",
        txRef: generateOrderNumber(),
      });

      if (!result.success) {
        return res.status(500).json({ success: false, message: "Failed to create appointment" });
      }

      return res.status(200).json({
        success: true,
        message: "Appointment booked successfully.",
        appointment: result.data,
      });
    }

    // Unsupported payment method
    return res.status(400).json({ success: false, message: "Unsupported payment method" });

  } catch (error) {
    console.error("Error in appointmentController:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
}

/**
 * Process payment webhook → ONLY handles Pay Online
 */
async function processPaymentWebhook({ status, txRef }) {
  try {
    if (!txRef) {
      return { success: false, message: "Transaction reference missing" };
    }
    if (status !== "successful") {
      return { success: false, message: "Payment not successful" };
    }

    const db = await initDB();
    const appointmentData = await db.get(
      `SELECT * FROM appointments WHERE txRef = ? AND status = 'pending'`,
      [txRef]
    );

    if (!appointmentData) {
      return { success: false, message: "No pending appointment found for this transaction" };
    }

    const result = await createAppointment({
      ...appointmentData,
      txRef,
      status: "confirmed",
      paymentStatus: "Paid",
    });

    if (result?.success) {
      await db.run(`DELETE FROM appointments WHERE txRef = ?`, [txRef]);
    } else {
      return { success: false, message: "Failed to create permanent appointment" };
    }

    return { success: true, message: "Appointment confirmed via webhook", result };
  } catch (error) {
    console.error("Error processing payment webhook:", error);
    return { success: false, message: "Server error processing webhook", error: error.message };
  }
}

/**
 * Controller to fetch all appointments
 */
const getAllAppointmentsController = async (req, res) => {
  try {
    const result = await getAllAppointments();

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("Controller Error (getAllAppointments):", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Controller to update appointment status
 */
const updateAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    let { status, payment_status } = req.body;

    // Ensure status and payment_status are strings
    if (status && typeof status === "object") status = status.status || null;
    if (payment_status && typeof payment_status === "object") payment_status = payment_status.payment_status || null;

    if (!status && !payment_status) {
      return res
        .status(400)
        .json({ success: false, message: "Either status or payment_status is required" });
    }

    const updates = {};
    if (status) updates.status = status;
    if (payment_status) updates.payment_status = payment_status;

    console.log(`Updating appointment ${id} with:`, updates);

    const result = await updateAppointmentById(id, updates);

    if (!result.success) {
      console.log(`Failed to update appointment ${id}:`, result.message);
      return res.status(404).json({ success: false, message: result.message });
    }

    console.log(`Appointment ${id} updated successfully.`);
    return res.status(200).json({ success: true, message: result.message });
  } catch (err) {
    console.error("Error in updateAppointmentController:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  appointmentController,
  processPaymentWebhook,
  getAllAppointmentsController,
  updateAppointmentController
};
