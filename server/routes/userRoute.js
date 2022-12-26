const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/api/get/:id", controller.findAll);

router.post("/api/post", controller.addData);

router.delete("/api/remove/:id", controller.deleteData);

router.put("/api/update/:id", controller.updateData);

router.get("/fooditem/get", controller.getFoodItem);

router.get("/energyburn/get", controller.getEnergyBurn);

router.get("/get/sorting/:sort", controller.sorting);

module.exports = router;
