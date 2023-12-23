const {
  findOrders,
  findOrderById,
  insertOrder,
  deleteOrder,
  editOrder,
} = require("./order.repository");

const getAllOrders = async () => {
  const orders = await findOrders();
  return orders;
};

const getOrderById = async (id) => {
  const order = await findOrderById(id);
  if (!order) {
    throw Error("Order not found");
  }
  return order;
};

const createOrder = async (orderData) => {
  const order = await insertOrder(orderData);
  return order;
};

const deleteOrderById = async (id) => {
  await getOrderById(id);
  await deleteOrder(id);
};

const editOrderById = async (id, orderData) => {
  await getOrderById(id);
  const order = await editOrder(id, orderData);
  return order;
};
module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrderById,
  editOrderById,
};
