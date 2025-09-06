// controllers/product.js
const asyncHandler = require("../../middleWare/asyncHandler");
const { getAllHairProducts, getHairProductById } = require("../../utility/product");

// Controller to get all products
const getProductsController = asyncHandler(async (req, res, next) => {
  const products = await getAllHairProducts();

  res.status(200).json({
    success: true,
    data: products
  });
});

// Controller to get a single product by ID
const getProductByIdController = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await getHairProductById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Hair product with ID ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

module.exports = { getProductsController, getProductByIdController };
