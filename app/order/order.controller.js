const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrderById,
  editOrderById,
} = require("./order.service");

//get all orders
router.get("/", async (req, res) => {
  const orders = await getAllOrders();
  res.status(200).send(orders);
});
//get order by id
router.get("/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const order = await getOrderById(order_id);
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//create order
router.post("/", async (req, res) => {
  try {
    const newOrderData = req.body;
    const pickup = new Date(newOrderData.pickup_date);
    const dropoff = new Date(newOrderData.dropoff_date);
    if (pickup >= dropoff) {
      throw new Error("Pickup and Dropoff date invalid");
    }
    const order = await createOrder(newOrderData);
    res.status(201).send({
      data: order,
      message: "Order Successfully Created",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//delete car
router.delete("/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;
    await deleteOrderById(order_id);
    res.status(200).send({ message: "Order Successfully Deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//update car
router.put("/:order_id", async (req, res) => {
  const order_id = req.params.order_id;
  const orderData = req.body;
  if (
    !(
      orderData.car_id &&
      orderData.order_date &&
      orderData.pickup_date &&
      orderData.pickup_location &&
      orderData.dropoff_date &&
      orderData.dropoff_location
    )
  ) {
    return res.status(400).send("Some fields are missing");
  }
  const order = await editOrderById(order_id, orderData);
  res.status(200).send({ data: order, message: "Order Successfully Updated" });
});
module.exports = router;
