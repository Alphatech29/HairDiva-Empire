const express = require("express");
const { getProductsController, getProductByIdController, addHairProduct, deleteProductByIdController, updateHairProductController } = require("../controllers/product/product");
const { createOrderController, getAllOrdersController, getOrderByNumberController, updateOrderStatusController} = require("../controllers/product/order");
const { login} = require("../controllers/auths/login");
const { flutterwaveWebhook } = require("../utility/webHook");
const generalRoute = express.Router();

// ------- General --------- //
generalRoute.get("/products", getProductsController);
generalRoute.get("/products/:id", getProductByIdController);
generalRoute.post("/add-products",addHairProduct);
generalRoute.delete("/products/:id",deleteProductByIdController);
generalRoute.put("/update-products/:id",updateHairProductController);
generalRoute.post("/order",createOrderController);
generalRoute.post("/flutterwave-webhook",flutterwaveWebhook);
generalRoute.get("/all-order",getAllOrdersController);
generalRoute.get("/order/:orderNumber",getOrderByNumberController);
generalRoute.put("/orders/:orderNumber/status",updateOrderStatusController);


// ------- Authentication --------- //
generalRoute.post("/login",login);


module.exports = generalRoute;
