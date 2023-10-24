const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//GET /register
router.get("/", userController.listUser);

module.exports = router;
