const crypto = require("crypto");

function generateUniqueBarcode(length = 13) {
  if (length < 2) throw new Error('Length must be at least 2 to include a starting letter.');

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let barcode;
  const randomLetterIndex = crypto.randomInt(0, letters.length);
  barcode = letters.charAt(randomLetterIndex);

  for (let i = 1; i < length; i++) {
    barcode += crypto.randomInt(0, 10).toString();
  }

  return barcode;
}

function generateOrderNumber(length = 8) {
  if (length < 1) throw new Error("Length must be at least 1");

  let orderNumber = "";
  for (let i = 0; i < length; i++) {
    orderNumber += crypto.randomInt(0, 10).toString();
  }

  return orderNumber;
}

module.exports = {generateUniqueBarcode, generateOrderNumber};
