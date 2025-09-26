// Helper: Format date for MySQL
function formatDateForMySQL(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Helper: Format time for MySQL
// Returns time as-is with AM/PM (e.g., "01:00 PM")
function formatTimeForMySQL(timeStr) {
  if (!timeStr) return null;
  // Ensure proper formatting and trim extra spaces
  const formatted = timeStr.trim().toUpperCase();
  // Optional validation: check pattern HH:MM AM/PM
  if (!/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/.test(formatted)) {
    throw new Error("Invalid time format. Expected HH:MM AM/PM");
  }
  return formatted;
}



module.exports = {
  formatDateForMySQL,
  formatTimeForMySQL,
};
