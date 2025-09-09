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
    console.log("Hair product and all variants inserted successfully.");
    return { productId, insertedVariants };
  } catch (err) {
    await connection.rollback();
    console.error("Error inserting hair product with variants:", err.message);
    throw err;
  } finally {
    connection.release();
  }
};



const getHairProductById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM hair_products WHERE id = ?", [id]);

    if (rows.length === 0) {
      return null;
    }

    const product = rows[0];
    product.colors = (() => {
      if (!product.colors) return [];
      if (typeof product.colors === "string") {
        try {
          return JSON.parse(product.colors);
        } catch (e) {
          console.error("Invalid JSON in colors field:", product.colors);
          return [];
        }
      }
      return product.colors;
    })();

    return product;
  } catch (err) {
    console.error(`Error fetching hair product with ID ${id}:`, err.message);
    throw err;
  }
};


module.exports = { getAllHairProducts, insertHairProductWithVariant, getHairProductById  };
