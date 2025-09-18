const pool = require("../model/db");

const getWebsiteSettings = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM websettings
    `);

    return rows;
  } catch (err) {
    console.error("Error fetching all website settings:", err.message);
    throw err;
  }
};

module.exports = {
  getWebsiteSettings,
};
