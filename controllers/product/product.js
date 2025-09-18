const asyncHandler = require("../../middleWare/asyncHandler");
const {
  getAllHairProducts, 
  getHairProductById,
  insertHairProductWithVariant,
  deleteHairProductById,
  updateHairProductWithVariant
} = require("../../utility/product");
const {generateUniqueBarcode} = require("../../utility/UniqueID")


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

const deleteProductByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await deleteHairProductById(id);

  if (!deletedProduct) {
    return res.status(404).json({
      success: false,
      message: `Hair product with ID ${id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: deletedProduct,
    message: `Hair product with ID ${id} deleted successfully`,
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


const updateHairProductController = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (req.files && req.files.length > 0);

    // ---------------- Get existing product from DB ----------------
    const existingProduct = await getHairProductById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: `Hair product with ID ${id} not found`,
      });
    }

    // ---------------- Parse JSON safely from multipart/form-data ----------------
    const parseJSON = (str, defaultValue) => {
      try {
        return str ? JSON.parse(str) : defaultValue;
      } catch {
        return defaultValue;
      }
    };

    const productFromFrontend = parseJSON(req.body.product, {});
    const variantsFromFrontend = parseJSON(req.body.variants, []);

    // ---------------- Build product update object ----------------
    const updatedProductData = {};
    if (productFromFrontend.product_name !== undefined) updatedProductData.product_name = productFromFrontend.product_name;
    if (productFromFrontend.hair_type !== undefined) updatedProductData.hair_type = productFromFrontend.hair_type;
    if (productFromFrontend.color !== undefined) updatedProductData.color = productFromFrontend.color;
    if (productFromFrontend.tag !== undefined) updatedProductData.tag = productFromFrontend.tag;
    if (productFromFrontend.description !== undefined) updatedProductData.description = productFromFrontend.description;
    if (req.files && req.files.length > 0) updatedProductData.image_url = `/uploads/${req.files[0].filename}`;


    // ---------------- Build variants update object ----------------
    const updatedVariantsData = variantsFromFrontend.map((v) => {
      const variantData = { variantId: v.variantId || null };

      if (v.size !== undefined) variantData.size = v.size;
      if (v.price !== undefined) variantData.price = parseFloat(v.price);
      if (v.old_price !== undefined) variantData.old_price = parseFloat(v.old_price);
      if (v.stock !== undefined) variantData.stock = parseInt(v.stock, 10);
      if (v.sold !== undefined) variantData.sold = v.sold;

      return variantData;
    });

    // ---------------- Call DB update function ----------------
    const result = await updateHairProductWithVariant(
      id,
      updatedProductData,
      updatedVariantsData
    );

    // ---------------- Handle DB response ----------------
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message || "Failed to update product",
        error: result.error || null,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        product: { id, ...result.updatedProduct },
        updatedVariants: result.updatedVariants,
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
  addHairProduct,
  deleteProductByIdController,
  updateHairProductController
};
