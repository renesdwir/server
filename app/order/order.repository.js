const prisma = require("../../db");

const findOrders = async () => {
  const orders = await prisma.order.findMany({
    include: { car: true },
  });
  return orders;
};
const findOrderById = async (id) => {
  const order = await prisma.order.findUnique({
    where: {
      order_id: parseInt(id),
    },
    include: { car: true },
  });
  return order;
};
const insertOrder = async (orderData) => {
  const order = await prisma.order.create({
    data: {
      car_id: parseInt(orderData.car_id),
      order_date: orderData.order_date,
      pickup_date: orderData.pickup_date,
      pickup_location: orderData.pickup_location,
      dropoff_date: orderData.dropoff_date,
      dropoff_location: orderData.dropoff_location,
    },
  });
  return order;
};
const deleteOrder = async (id) => {
  await prisma.order.delete({
    where: {
      order_id: parseInt(id),
    },
  });
};
const editOrder = async (id, orderData) => {
  const order = await prisma.order.update({
    where: {
      order_id: parseInt(id),
    },
    data: {
      car_id: parseInt(orderData.car_id),
      order_date: orderData.order_date,
      pickup_date: orderData.pickup_date,
      pickup_location: orderData.pickup_location,
      dropoff_date: orderData.dropoff_date,
      dropoff_location: orderData.dropoff_location,
    },
  });
  return order;
};
module.exports = {
  findOrders,
  findOrderById,
  insertOrder,
  deleteOrder,
  editOrder,
};
