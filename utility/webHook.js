const { updateOrderStatus } = require("../utility/order");
const { createTransaction } = require("../utility/transaction");

const flutterwaveWebhook = async (req, res) => {
  try {
    const payload = req.body;
    console.log("Webhook payload received:", JSON.stringify(payload, null, 2));

    const orderNumber = payload?.data?.tx_ref;
    if (!orderNumber) return res.status(400).send("order_number missing");

    if (payload.data.status !== "successful") {
      console.log(`Payment not successful for order_number: ${orderNumber}`);
      return res.status(200).send("Payment not successful");
    }

    //  Save transaction
    const transactionSaved = await createTransaction(payload.data);
    if (!transactionSaved.success) {
      return res.status(500).send("Failed to save transaction");
    }

    //  Update order status to paid
    const updated = await updateOrderStatus(orderNumber, "paid");
    if (!updated.success) {
      console.error("Failed to update order status:", updated.message);
      return res.status(500).send("Failed to update order status");
    }

    console.log(`Payment successful for order ${orderNumber}`);
    res.status(200).send("Webhook processed successfully");
  } catch (err) {
    console.error("Error handling Flutterwave webhook:", err);
    res.status(500).send("Server error");
  }
};

module.exports = { flutterwaveWebhook };
