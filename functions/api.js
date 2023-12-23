require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const carController = require("../app/car/car.controller");
const orderController = require("../app/order/order.controller");
app.use("/.netlify/functions/api/cars", carController);
app.use("/.netlify/functions/api/orders", orderController);
module.exports.handler = serverless(app);
