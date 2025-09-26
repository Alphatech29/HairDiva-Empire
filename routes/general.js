const express = require("express");
const { getProductsController, getProductByIdController, addHairProduct, deleteProductByIdController, updateHairProductController } = require("../controllers/shop/product");
const { createOrderController, getAllOrdersController, getOrderByNumberController, updateOrderStatusController} = require("../controllers/shop/order");
const { login} = require("../controllers/auths/login");
const { flutterwaveWebhook } = require("../utility/webHook");
const { getAllTransactionsController } = require("../controllers/shop/transactions");
const { addService, fetchServices, editServiceById, deleteService } = require("../controllers/shop/service");
const { appointmentController, getAllAppointmentsController, updateAppointmentController } = require("../controllers/shop/appointment");
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
generalRoute.get("/transaction",getAllTransactionsController);
generalRoute.post("/create-service",addService);
generalRoute.get("/all-services",fetchServices);
generalRoute.put("/services/:id",editServiceById);
generalRoute.delete("/services/:id",deleteService);
generalRoute.post("/create-appointment",appointmentController);
generalRoute.get("/all-appointment",getAllAppointmentsController);
generalRoute.put("/appointments/:id", updateAppointmentController);

// ------- Authentication --------- //
generalRoute.post("/login",login);


module.exports = generalRoute;
