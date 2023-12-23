const {
  findCars,
  findCarById,
  insertCar,
  deleteCar,
  editCar,
} = require("./car.repository");

const getAllCars = async () => {
  const cars = await findCars();
  return cars;
};

const getCarById = async (id) => {
  const car = await findCarById(id);
  if (!car) {
    throw Error("Car not found");
  }
  return car;
};

const createCar = async (newCarData) => {
  const car = await insertCar(newCarData);
  return car;
};

const deleteCarById = async (id) => {
  await getCarById(id);
  await deleteCar(id);
};

const editCarById = async (id, carData) => {
  await getCarById(id);
  const car = await editCar(id, carData);
  return car;
};
module.exports = {
  getAllCars,
  getCarById,
  createCar,
  deleteCarById,
  editCarById,
};
