const express = require("express");
const { getProductsController, getProductByIdController } = require("../controllers/product/product");
const generalRoute = express.Router();

// ------- General --------- //
generalRoute.get("/products", getProductsController);
generalRoute.get("/product/:id", getProductByIdController);

module.exports = generalRoute;
