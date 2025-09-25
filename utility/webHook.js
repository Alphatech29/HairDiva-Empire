const { updateOrderStatus } = require("../utility/order");
const { createTransaction } = require("../utility/transaction");
const { updateVariants } = require("../utility/stockUpdate");
const { processPaymentWebhook } = require("../controllers/shop/appointment");

const flutterwaveWebhook = async (req, res) => {
  try {
    console.log("STEP 1: Webhook received");

    const payload = req.body;
    console.log("STEP 2: Raw payload:", JSON.stringify(payload, null, 2));

    const orderNumber = payload?.data?.tx_ref;
    const status = payload?.data?.status;

    console.log("STEP 3: Extracted orderNumber:", orderNumber);
    console.log("STEP 4: Extracted status:", status);

    if (!orderNumber) {
      console.error("ERROR: order_number missing in payload");
      return res.status(400).send("order_number missing");
    }

    if (status !== "successful") {
      console.log(`STEP 5: Payment not successful for order_number: ${orderNumber}`);
      // still trigger appointment flow for failed/cancelled payments
      runAppointmentConfirmation(status, orderNumber);
      return res.status(200).send("Payment not successful");
    }

    // Save transaction
    console.log("STEP 6: Saving transaction to database...");
    const transactionSaved = await createTransaction(payload.data);

    if (!transactionSaved.success) {
      console.error("ERROR: Failed to save transaction");
      // still trigger appointment in background
      runAppointmentConfirmation(status, orderNumber);
      return res.status(500).send("Failed to save transaction");
    }
    console.log("STEP 7: Transaction saved successfully");

    // Update order status to 'paid'
    console.log(`STEP 8: Updating order ${orderNumber} status to 'paid'...`);
    const updatedOrder = await updateOrderStatus(orderNumber, "paid");

    if (!updatedOrder.success) {
      console.error("ERROR: Failed to update order status:", updatedOrder.message);
    } else {
      console.log("STEP 9: Order status updated successfully");
    }

    // Update stock
    console.log(`STEP 10: Updating stock for order ${orderNumber}...`);
    try {
      await updateVariants(orderNumber);
      console.log(`STEP 11: Stock updated for order ${orderNumber}`);
    } catch (err) {
      console.error(`ERROR: Failed to update stock for order ${orderNumber}:`, err.message);
    }

    // Always run appointment confirmation in background
    runAppointmentConfirmation(status, orderNumber);

    // Respond immediately to Flutterwave
    console.log(`STEP 14: Payment successful for order ${orderNumber}`);
    res.status(200).send("Webhook processed successfully");

  } catch (err) {
    console.error("ERROR: Exception handling Flutterwave webhook:", err);
    res.status(500).send("Server error");
  }
};

// helper for background appointment confirmation
function runAppointmentConfirmation(status, orderNumber) {
  console.log("STEP 12: Running appointment confirmation in background...");
  (async () => {
    try {
      console.log("STEP 12a: Appointment confirmation background job started");
      const appointmentResult = await processPaymentWebhook({ status, txRef: orderNumber });

      if (!appointmentResult.success) {
        console.error("ERROR: Background appointment confirmation failed:", appointmentResult.message);
      } else {
        console.log("STEP 13: Appointment confirmed in background:", appointmentResult.result);
      }
    } catch (err) {
      console.error("ERROR: Exception in background appointment confirmation:", err);
    }
  })();
}

module.exports = { flutterwaveWebhook };
