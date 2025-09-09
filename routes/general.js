const express = require("express");
const { getProductsController, getProductByIdController, addHairProduct } = require("../controllers/product/product");
const { login} = require("../controllers/auths/login");
const generalRoute = express.Router();

// ------- General --------- //
generalRoute.get("/products", getProductsController);
generalRoute.get("/products/:id", getProductByIdController);
generalRoute.post("/add-products",addHairProduct);

// ------- Authentication --------- //
generalRoute.post("/login",login);

module.exports = generalRoute;
