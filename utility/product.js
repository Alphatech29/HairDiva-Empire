const pool = require("../model/db");

const getAllHairProducts = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM hair_products");

    const products = rows.map(product => ({
      ...product,
      colors: (() => {
        if (!product.colors) return [];
        if (typeof product.colors === "string") {
          try {
            return JSON.parse(product.colors);
          } catch (e) {
            console.error("Invalid JSON in colors field:", product.colors);
            return [];
          }
        }
        // already object/array
        return product.colors;
      })()
    }));

    return products;
  } catch (err) {
    console.error("Error fetching hair products:", err.message);
    throw err;
  }
};


const getHairProductById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM hair_products WHERE id = ?", [id]);

    if (rows.length === 0) {
      return null;
    }

    const product = rows[0];

    // Parse colors field
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


module.exports = { getAllHairProducts, getHairProductById  };
