const asyncHandler = require("../../middleWare/asyncHandler");
const {
  getAllHairProducts, 
  getHairProductById, 
  insertHairProductWithVariant
} = require("../../utility/product");
const generateUniqueBarcode = require("../../utility/generateUniqueBarcode")


const getProductsController = asyncHandler(async (req, res) => {
  const products = await getAllHairProducts();

  return res.status(200).json({
    success: true,
    data: products,
  });
});


const getProductByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await getHairProductById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Hair product with ID ${id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});


const addHairProduct = asyncHandler(async (req, res) => {
  try {
    let product, variants;
    try {
      product = req.body.product ? JSON.parse(req.body.product) : null;
      variants = req.body.variants ? JSON.parse(req.body.variants) : [];
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format in product or variants.",
        error: err.message,
      });
    }

    if (!product || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product and at least one variant are required.",
      });
    }

    product.image_url = req.files && req.files.length > 0
      ? `/uploads/${req.files[0].filename}`
      : null;
    product.barcode = generateUniqueBarcode(5);

    const { productId, insertedVariants } = await insertHairProductWithVariant(product, variants);

    return res.status(201).json({
      success: true,
      message: "Hair product and variants inserted successfully.",
      data: {
        product: { id: productId, ...product },
        variants: insertedVariants,
      },
    });
  } catch (err) {
    console.error("Controller error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
});




module.exports = { 
  getProductsController, 
  getProductByIdController, 
  addHairProduct 
};
