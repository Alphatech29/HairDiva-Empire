const pool = require("../model/db");

const getAllHairProducts = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.*,
        v.id AS variant_id,
        v.length AS variant_length,
        v.price AS variant_price,
        v.old_price AS variant_old_price,
        v.stock AS variant_stock,
        v.sold AS variant_sold
      FROM hair_products p
      LEFT JOIN hair_variants v ON v.product_id = p.id
      ORDER BY p.id, v.id
    `);

    const productsMap = new Map();

    rows.forEach(row => {
      const productId = row.id;
      if (!productsMap.has(productId)) {
        const product = Object.fromEntries(
          Object.entries(row).filter(([key]) => !key.startsWith("variant_") && key !== "id")
        );
        product.id = productId;
        product.variants = [];
        productsMap.set(productId, product);
      }

      if (row.variant_id) {
        const variant = Object.fromEntries(
          Object.entries(row)
            .filter(([key]) => key.startsWith("variant_"))
            .map(([key, value]) => [key.replace("variant_", ""), value])
        );
        productsMap.get(productId).variants.push(variant);
      }
    });

    return Array.from(productsMap.values());
  } catch (err) {
    console.error("Error fetching hair products with variants:", err.message);
    throw err;
  }
};


const insertHairProductWithVariant = async (product, variants) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [productResult] = await connection.query(
     `INSERT INTO hair_products
    (product_name, hair_type, description, color, tag, image_url, barcode)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    product.product_name,
    product.hair_type,
    product.description,
    product.color,
    product.tag,
    product.image_url,
    product.barcode
  ]
    );

    const productId = productResult.insertId;

    const insertedVariants = [];
    for (const variant of variants) {
      const [variantResult] = await connection.query(
        `INSERT INTO hair_variants 
          (product_id, length, price, old_price, stock, sold)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          productId,
          variant.length,
          variant.price,
          variant.old_price || null,
          variant.stock || 0,
          variant.sold || 0
        ]
      );
      insertedVariants.push({ variantId: variantResult.insertId, ...variant });
    }

    await connection.commit();
    return { productId, insertedVariants };
  } catch (err) {
    await connection.rollback();
    console.error("Error inserting hair product with variants:", err.message);
    throw err;
  } finally {
    connection.release();
  }
};


const updateHairProductWithVariant = async (productId, product, variants) => {
  if (!productId) {
    return {
      success: false,
      message: "Product ID is required for update",
    };
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // ---------------- Get existing product ----------------
    const [existingRows] = await connection.query(
      "SELECT * FROM hair_products WHERE id = ?",
      [productId]
    );
    if (!existingRows.length) {
      await connection.rollback();
      return {
        success: false,
        message: "Product not found",
      };
    }

    const existingProduct = existingRows[0];

    // ---------------- Update only fields that were sent ----------------
    const productFields = [];
    const productValues = [];

    if (product.product_name !== undefined) { productFields.push("product_name = ?"); productValues.push(product.product_name); }
    if (product.hair_type !== undefined) { productFields.push("hair_type = ?"); productValues.push(product.hair_type); }
    if (product.description !== undefined) { productFields.push("description = ?"); productValues.push(product.description); }
    if (product.color !== undefined) { productFields.push("color = ?"); productValues.push(product.color); }
    if (product.tag !== undefined) { productFields.push("tag = ?"); productValues.push(product.tag); }
    if (product.image_url !== undefined) { productFields.push("image_url = ?"); productValues.push(product.image_url); }

    if (productFields.length > 0) {
      await connection.query(
        `UPDATE hair_products SET ${productFields.join(", ")} WHERE id = ?`,
        [...productValues, productId]
      );
    }

    // ---------------- Update or insert variants ----------------
    const updatedVariants = [];

    for (const v of variants) {
      if (v.variantId) {
        const setFields = [];
        const values = [];

        if (v.size !== undefined) { setFields.push("length = ?"); values.push(v.size); }
        if (v.price !== undefined) { setFields.push("price = ?"); values.push(parseFloat(v.price)); }
        if (v.old_price !== undefined) { setFields.push("old_price = ?"); values.push(parseFloat(v.old_price)); }
        if (v.stock !== undefined) { setFields.push("stock = ?"); values.push(parseInt(v.stock, 10)); }
        if (v.sold !== undefined) { setFields.push("sold = ?"); values.push(v.sold); }

        if (setFields.length > 0) {
          await connection.query(
            `UPDATE hair_variants SET ${setFields.join(", ")} WHERE id = ? AND product_id = ?`,
            [...values, v.variantId, productId]
          );
        }

        updatedVariants.push({ ...v });
      } else {
        const [result] = await connection.query(
          `INSERT INTO hair_variants (product_id, length, price, old_price, stock, sold)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            productId,
            v.size || null,
            v.price !== undefined ? parseFloat(v.price) : null,
            v.old_price !== undefined ? parseFloat(v.old_price) : null,
            v.stock !== undefined ? parseInt(v.stock, 10) : 0,
            v.sold || 0,
          ]
        );
        updatedVariants.push({ ...v, variantId: result.insertId });
      }
    }

    await connection.commit();

    return {
      success: true,
      message: "Hair product and variants updated successfully",
      data: {
        updatedProduct: product,
        updatedVariants,
      },
    };
  } catch (err) {
    await connection.rollback();
    console.error("Error updating hair product with variants:", err);

    return {
      success: false,
      message: err.message || "Failed to update hair product",
      error: err,
    };
  } finally {
    connection.release();
  }
};


const getHairProductById = async (id) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.*,
        v.id AS variant_id,
        v.length AS variant_length,
        v.price AS variant_price,
        v.old_price AS variant_old_price,
        v.stock AS variant_stock,
        v.sold AS variant_sold
      FROM hair_products p
      LEFT JOIN hair_variants v ON v.product_id = p.id
      WHERE p.id = ?
      ORDER BY v.id
    `, [id]);

    if (rows.length === 0) return null;

    const productRow = rows[0];
    const product = Object.fromEntries(
      Object.entries(productRow).filter(([key]) => !key.startsWith("variant_") && key !== "id")
    );
    product.id = productRow.id;

    // Add variants
    product.variants = rows
      .filter(row => row.variant_id)
      .map(row => Object.fromEntries(
        Object.entries(row)
          .filter(([key]) => key.startsWith("variant_"))
          .map(([key, value]) => [key.replace("variant_", ""), value])
      ));

    return product;
  } catch (err) {
    console.error(`Error fetching hair product with ID ${id}:`, err.message);
    throw err;
  }
};



const deleteHairProductById = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM hair_products WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Error deleting hair product with ID ${id}:`, err.message);
    throw err;
  }
};


module.exports = { getAllHairProducts, insertHairProductWithVariant, getHairProductById, deleteHairProductById, updateHairProductWithVariant  };
