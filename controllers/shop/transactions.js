const { getAllTransactions } = require("../../utility/transaction");


async function getAllTransactionsController(req, res) {
  try {
    const result = await getAllTransactions();

    if (result.success) {
      return res.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (err) {
    console.error("Controller getAllTransactions error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  getAllTransactionsController,
};
