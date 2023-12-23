require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();
app.use(express.json());

const carController = require("../app/car/car.controller");
const orderController = require("../app/order/order.controller");
app.use("/.netlify/functions/api/cars", carController);
app.use("/.netlify/functions/api/orders", orderController);
module.exports.handler = serverless(app);
