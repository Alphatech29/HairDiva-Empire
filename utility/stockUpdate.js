const pool = require("../model/db");

async function updateVariants(orderNumber) {
  if (!orderNumber) throw new Error("orderNumber is required");

  try {
    // Fetch items in the order
    const [orderItems] = await pool.query(
      `SELECT variant_id, quantity
       FROM order_items
       WHERE order_number = ?`,
      [orderNumber]
    );

    if (!orderItems || orderItems.length === 0) {
      console.log(`No items found for order ${orderNumber}`);
      return;
    }

    // Update stock and sold for each variant
    for (const item of orderItems) {
      await pool.query(
        `UPDATE hair_variants
         SET stock = stock - ?, sold = sold + ?
         WHERE id = ?`,
        [item.quantity, item.quantity, item.variant_id]
      );
      console.log(
        `Variant ID ${item.variant_id}: -${item.quantity} stock, +${item.quantity} sold`
      );
    }

    console.log(`All variants updated successfully for order ${orderNumber}`);
  } catch (err) {
    console.error(`Error updating variants for order ${orderNumber}:`, err.message);
    throw err;
  }
}


module.exports = { updateVariants };
