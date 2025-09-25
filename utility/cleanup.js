const initDB = require("../model/sqlite");

async function cleanupOldAppointments() {
  try {
    const db = await initDB();

    await db.run(`
      UPDATE appointments 
      SET status = 'expired' 
      WHERE status = 'pending' 
      AND createdAt <= datetime('now', '-1 day')
    `);

    await db.run(`
      DELETE FROM appointments 
      WHERE status = 'expired' 
      AND createdAt <= datetime('now', '-2 day')
    `);

  } catch (err) {
   console.error("Cleanup error:", err);
  }
}

setInterval(cleanupOldAppointments, 60 * 60 * 1000);

module.exports = cleanupOldAppointments;
