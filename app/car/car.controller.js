const express = require("express");
const router = express.Router();
const {
  getAllCars,
  getCarById,
  createCar,
  deleteCarById,
  editCarById,
} = require("./car.service");

//get all cars
router.get("/", async (req, res) => {
  const cars = await getAllCars();
  res.status(200).send(cars);
});
//get car by id
router.get("/:car_id", async (req, res) => {
  try {
    const car_id = req.params.car_id;
    const car = await getCarById(car_id);
    res.status(200).send(car);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//create car
router.post("/", async (req, res) => {
  try {
    const newCarData = req.body;
    const car = await createCar(newCarData);
    res.status(201).send({
      data: car,
      message: "Car Successfully Created",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//delete car
router.delete("/:car_id", async (req, res) => {
  try {
    const car_id = req.params.car_id;
    await deleteCarById(car_id);
    res.status(200).send({ message: "Car Successfully Deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//update car
router.put("/:car_id", async (req, res) => {
  const car_id = req.params.car_id;
  const carData = req.body;
  if (!(carData.car_name && carData.day_rate && carData.image && carData.month_rate)) {
    return res.status(400).send("Some fields are missing");
  }
  const car = await editCarById(car_id, carData);
  res.status(200).send({ data: car, message: "Car Successfully Updated" });
});
module.exports = router;
