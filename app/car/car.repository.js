const prisma = require("../../db");

const findCars = async () => {
  const today = new Date();
  const cars = await prisma.car.findMany({
    include: { orders: { where: { dropoff_date: { gte: new Date() } } } },
  });
  return cars;
};
const findCarById = async (id) => {
  const car = await prisma.car.findUnique({
    where: {
      car_id: parseInt(id),
    },
    include: { orders: true },
  });
  return car;
};
const insertCar = async (carData) => {
  const car = await prisma.car.create({
    data: {
      car_name: carData.car_name,
      day_rate: carData.day_rate,
      image: carData.image,
      month_rate: carData.month_rate,
    },
  });
  return car;
};
const deleteCar = async (id) => {
  await prisma.car.delete({
    where: {
      car_id: parseInt(id),
    },
  });
};
const editCar = async (id, carData) => {
  const car = await prisma.car.update({
    where: {
      car_id: parseInt(id),
    },
    data: {
      car_name: carData.car_name,
      day_rate: carData.day_rate,
      image: carData.image,
      month_rate: carData.month_rate,
    },
  });
  return car;
};
module.exports = {
  findCars,
  findCarById,
  insertCar,
  deleteCar,
  editCar,
};
