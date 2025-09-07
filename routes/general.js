const express = require("express");
const { getProductsController, getProductByIdController } = require("../controllers/product/product");
const { login} = require("../controllers/auths/login");
const generalRoute = express.Router();

// ------- General --------- //
generalRoute.get("/products", getProductsController);
generalRoute.get("/product/:id", getProductByIdController);

// ------- Authentication --------- //
generalRoute.post("/login", login);

module.exports = generalRoute;
