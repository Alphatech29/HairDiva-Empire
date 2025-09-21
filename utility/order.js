const pool = require("../model/db");

const createOrder = async (orderData) => {
  const {
    orderNumber,
    customer: { fullName, email, phone },
    shipping: { address, city, state },
    order: { summary },
  } = orderData;

  try {
    const [result] = await pool.query(
      `
      INSERT INTO orders (
        order_number,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        shipping_city,
        shipping_state,
        subtotal,
        discount,
        vat_amount,
        shipping_cost,
        total
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        orderNumber,
        fullName,
        email,
        phone,
        address,
        city,
        state,
        summary.subtotal,
        summary.discount,
        summary.vat,
        summary.shipping,
        summary.grandTotal,
      ]
    );
    return {
      success: true,
      message: "Order created successfully",
      data: { id: result.insertId, orderNumber },
    };
  } catch (err) {
    console.error("Error creating order:", err.message);
    return { success: false, message: err.message };
  }
};


const createOrderItems = async (orderNumber, items) => {
  if (!items || !items.length) {
    return { success: false, message: "No items to insert" };
  }

  try {
    // Map items into values array for bulk insert
    const values = items.map((item) => [
      orderNumber,
      item.variant?.id || null,
      item.id || null,
      item.barcode || null,
      item.color || null,
      item.variant?.length || null,
      item.quantity || 0,
      item.variant?.price || item.price || 0,
      (item.quantity || 0) * (item.variant?.price || item.price || 0),
    ]);

    const [result] = await pool.query(
      `
      INSERT INTO order_items (
        order_number,
        variant_id,
        product_id,
        barcode,
        color,
        length,
        quantity,
        unit_price,
        total
      ) VALUES ?
      `,
      [values]
    );

    return {
      success: true,
      message: "Order items created successfully",
      data: { affectedRows: result.affectedRows },
    };
  } catch (err) {
    console.error("Error creating order items:", err.message);
    return { success: false, message: err.message };
  }
};


// Update order status by order_number
const updateOrderStatus = async (orderNumber, status) => {
  try {
    // Map status to corresponding timestamp column
    let timestampField = null;
    switch (status) {
      case "paid":
        timestampField = "paid_at";
        break;
      case "shipped":
        timestampField = "shipped_at";
        break;
      case "completed":
        timestampField = "completed_at";
        break;
      case "cancelled":
        timestampField = "cancelled_at";
        break;
      default:
        break;
    }

    // Build query
    let query;
    let params;
    if (timestampField) {
      query = `UPDATE orders SET status = ?, ${timestampField} = NOW() WHERE order_number = ?`;
      params = [status, orderNumber];
    } else {
      query = `UPDATE orders SET status = ? WHERE order_number = ?`;
      params = [status, orderNumber];
    }

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return { success: false, message: "Order not found" };
    }

    return { success: true, message: "Order status updated successfully" };
  } catch (err) {
    console.error("Error updating order status:", err.message);
    return { success: false, message: err.message };
  }
};




// Function to get all orders
const getAllOrders = async () => {
  try {
    const [rows] = await pool.query(`SELECT * FROM orders`);

    return {
      success: true,
      message: "Orders retrieved successfully",
      data: rows,
    };
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    return { success: false, message: err.message };
  }
};

// Function to get an order with detailed items (including product info)
const getOrderByNumber = async (orderNumber) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        o.id AS order_id,
        o.order_number,
        o.customer_name,
        o.customer_email,
        o.customer_phone,
        o.shipping_address,
        o.shipping_city,
        o.shipping_state,
        o.subtotal,
        o.discount,
        o.vat_amount,
        o.shipping_cost,
        o.total,
        o.status,
        o.pending_at,
        o.paid_at,
        o.shipped_at,
        o.completed_at,
        o.cancelled_at,

        oi.id AS order_item_id,
        oi.variant_id,
        oi.product_id,
        oi.barcode,
        oi.color,
        oi.length,
        oi.quantity,
        oi.unit_price,
        oi.total AS item_total,

        p.product_name,
        p.image_url

      FROM orders o
      LEFT JOIN order_items oi ON o.order_number = oi.order_number
      LEFT JOIN hair_products p ON oi.product_id = p.id
      WHERE o.order_number = ?
      `,
      [orderNumber]
    );

    if (rows.length === 0) {
      return {
        success: false,
        message: `No order found with order number: ${orderNumber}`,
      };
    }

    // Build structured response
    const order = {
      id: rows[0].order_id,
      order_number: rows[0].order_number,
      customer_name: rows[0].customer_name,
      customer_email: rows[0].customer_email,
      customer_phone: rows[0].customer_phone,
      shipping_address: rows[0].shipping_address,
      shipping_city: rows[0].shipping_city,
      shipping_state: rows[0].shipping_state,
      subtotal: rows[0].subtotal,
      discount: rows[0].discount,
      vat_amount: rows[0].vat_amount,
      shipping_cost: rows[0].shipping_cost,
      total: rows[0].total,
      status: rows[0].status,
      pending_at: rows[0].pending_at,
      paid_at: rows[0].paid_at,
      shipped_at: rows[0].shipped_at,
      completed_at: rows[0].completed_at,
      cancelled_at: rows[0].cancelled_at,
      items: rows
        .filter((row) => row.order_item_id) // filter out null items if no products
        .map((row) => ({
          id: row.order_item_id,
          variant_id: row.variant_id,
          product_id: row.product_id,
          barcode: row.barcode,
          color: row.color,
          length: row.length,
          quantity: row.quantity,
          unit_price: row.unit_price,
          total: row.item_total,
          product_name: row.product_name,
          image_url: row.image_url,
        })),
    };

    return {
      success: true,
      message: "Order retrieved successfully",
      data: order,
    };
  } catch (err) {
    console.error("Error fetching order:", err.message);
    return { success: false, message: err.message };
  }
};



module.exports = { createOrder, createOrderItems, updateOrderStatus, getAllOrders, getOrderByNumber };
