const pool = require("../model/db");

const createOrder = async (orderData) => {
  const {
    orderNumber, // <-- add this line
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

    // Return the order number and inserted ID
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
    const values = items.map((item) => [
      orderNumber,
      item.id,               // product_id
      item.barcode || null,  // barcode
      item.color || null,
      item.variant?.length || null, // length
      item.quantity,
      item.price,
      item.price * item.quantity,   // total
    ]);

    const [result] = await pool.query(
      `
      INSERT INTO order_items (
        order_number,
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
    const [result] = await pool.query(
      `UPDATE orders SET status = ? WHERE order_number = ?`,
      [status, orderNumber]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "Order not found" };
    }

    return { success: true, message: "Order status updated successfully" };
  } catch (err) {
    console.error("Error updating order status:", err.message);
    return { success: false, message: err.message };
  }
};



module.exports = { createOrder, createOrderItems, updateOrderStatus };
