const express = require("express");
const { getProductsController, getProductByIdController, addHairProduct, deleteProductByIdController, updateHairProductController } = require("../controllers/product/product");
const { login} = require("../controllers/auths/login");
const generalRoute = express.Router();

// ------- General --------- //
generalRoute.get("/products", getProductsController);
generalRoute.get("/products/:id", getProductByIdController);
generalRoute.post("/add-products",addHairProduct);
generalRoute.delete("/products/:id",deleteProductByIdController);
generalRoute.put("/update-products/:id",updateHairProductController);

// ------- Authentication --------- //
generalRoute.post("/login",login);

module.exports = generalRoute;
