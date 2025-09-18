const pool = require("../model/db");

async function createTransaction(data) {
  try {
    const sql = `
      INSERT INTO transactions (
        id, order_number, flw_ref, amount, currency,
        charged_amount, app_fee, merchant_fee,
        processor_response, auth_model, account_id, ip,
        narration, payment_type, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE status = VALUES(status), processor_response = VALUES(processor_response)
    `;

    await pool.query(sql, [
      data.id,
      data.tx_ref,
      data.flw_ref,
      data.amount,
      data.currency,
      data.charged_amount,
      data.app_fee,
      data.merchant_fee,
      data.processor_response,
      data.auth_model,
      data.account_id,
      data.ip,
      data.narration,
      data.payment_type,
      data.status,
    ]);

    return { success: true };
  } catch (err) {
    console.error("DB insert error:", err);
    return { success: false, message: err.message };
  }
}

module.exports = { createTransaction };
