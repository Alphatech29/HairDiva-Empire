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

module.exports = generateUniqueBarcode;
