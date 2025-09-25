const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function initDB() {
  const db = await open({
    filename: "./appointments.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      txRef TEXT UNIQUE,
      fullName TEXT,
      email TEXT,
      phone TEXT,
      whatsapp TEXT,
      address TEXT,
      serviceId TEXT,
      appointmentDate TEXT,
      appointmentTime TEXT,
      amount REAL,
      message TEXT,
      paymentMethod TEXT,
      status TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

module.exports = initDB;
