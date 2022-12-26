const express = require("express");
const router = express.Router();
const controller = require("../controllers/loginController");

router.post("/users", controller.register);

router.get("/users", controller.findAll);

router.post("/login", controller.login);

module.exports = router;
