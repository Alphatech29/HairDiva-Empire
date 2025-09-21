const { generateOrderNumber } = require("../../utility/UniqueID");
const { createPaymentLink } = require("../../utility/flutterwave");
const { createOrder, createOrderItems, getAllOrders, getOrderByNumber } = require("../../utility/order");
const { getWebsiteSettings } = require("../../utility/general");

const createOrderController = async (req, res) => {
  try {
    console.log("📦 Incoming Order Payload:", JSON.stringify(req.body, null, 2));

    // Validate required data
    const customer = req.body.customer || {};
    const shipping = req.body.shipping || {};
    const order = req.body.order || {};
    const orderItems = order.items || [];

    if (!customer.email || !customer.fullName || !customer.phone) {
      return res.status(400).json({ success: false, message: "Customer information is incomplete" });
    }

    if (!shipping.address || !shipping.city || !shipping.state) {
      return res.status(400).json({ success: false, message: "Shipping information is incomplete" });
    }

    if (!orderItems.length || !order.summary?.grandTotal) {
      return res.status(400).json({ success: false, message: "Order items or total is missing" });
    }

    // Generate order number
    const orderNumber = generateOrderNumber();
    console.log("Generated Order Number:", orderNumber);

    const orderPayload = { orderNumber, customer, shipping, order, status: "pending" };

    // Save order
    const savedOrder = await createOrder(orderPayload);
    if (!savedOrder.success) {
      return res.status(500).json({ success: false, message: "Failed to create order" });
    }

    // Save order items
    const itemsResult = await createOrderItems(orderNumber, orderItems);
    if (!itemsResult.success) {
      return res.status(500).json({ success: false, message: "Failed to save order items" });
    }

    // Get website settings
    const settingsArray = await getWebsiteSettings();
    if (!settingsArray || !settingsArray.length) {
      throw new Error("No website settings found");
    }

    const settings = settingsArray[0];
    if (!settings.site_url) {
      throw new Error("site URL not configured");
    }
    const webUrl = settings.site_url;

    // Prepare payment data
    const paymentData = {
      amount: order.summary.grandTotal,
      currency: "NGN",
      email: customer.email,
      name: customer.fullName,
      phone: customer.phone,
      reference: orderNumber,
      redirectUrl: `${webUrl}/shop/confirmation`,
      title: "HairDiva Empire",
      description: `Payment for order #${orderNumber}`,
      meta: {
        orderNumber,
        customer,
        order,
      },
    };

    // Generate Flutterwave payment link
    const linkData = await createPaymentLink(paymentData);
    if (!linkData?.link) {
      return res.status(500).json({ success: false, message: "Failed to generate payment link" });
    }

    // Respond with payment link
    res.status(200).json({
      success: true,
      message: "Order created and payment link generated",
      paymentLink: linkData.link,
      orderNumber,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// Controller to fetch all orders
const getAllOrdersController = async (req, res) => {
  try {
    const result = await getAllOrders();

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (err) {
    console.error("Error in getAllOrdersController:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
};

// Controller to fetch a single order by order number
const getOrderByNumberController = async (req, res) => {
  try {
    const { orderNumber } = req.params; // from route params: /orders/:orderNumber

    const result = await getOrderByNumber(orderNumber);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result); // use 404 when order not found
    }
  } catch (err) {
    console.error("Error in getOrderByNumberController:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching order",
    });
  }
};


module.exports = { createOrderController, getAllOrdersController, getOrderByNumberController };
