const { createAppointment } = require("../../utility/appointment");
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

    //  Validate
    if (!appointmentData.fullName || !appointmentData.serviceId || !appointmentData.date || !appointmentData.time) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const serviceResult = await getServiceById(appointmentData.serviceId);
    if (!serviceResult.success) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const serviceAmount = serviceResult.data.price;

    const settingsRows = await getWebsiteSettings();
    if (!settingsRows?.length || !settingsRows[0].site_url) {
      return res.status(500).json({ success: false, message: "Website settings not configured properly" });
    }
    const siteUrl = settingsRows[0].site_url;

    const pendingAppointment = {
      fullName: appointmentData.fullName,
      email: appointmentData.email,
      phone: appointmentData.phone,
      whatsapp: appointmentData.whatsapp,
      address: appointmentData.address,
      serviceId: appointmentData.serviceId,
      appointmentDate: formatDateForMySQL(appointmentData.date),
      appointmentTime: formatTimeForMySQL(appointmentData.time),
      amount: parseFloat(serviceAmount),
      message: appointmentData.notes,
      paymentMethod: appointmentData.paymentMethod,
    };

    //  PAY ONLINE → store in SQLite as "pending"
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

    // PAY IN SHOP → no DB save here
    return res.status(200).json({
      success: true,
      message: "Pay in shop selected, appointment will be created manually at the shop",
    });

  } catch (error) {
    console.error(" Error in appointmentController:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
}

/**
 * Process payment webhook → ONLY place we call createAppointment
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
    console.error(" Error processing payment webhook:", error);
    return { success: false, message: "Server error processing webhook", error: error.message };
  }
}

module.exports = {
  appointmentController,
  processPaymentWebhook,
};
