const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//GET /register
// router.get('/', userController.registerForm)
//POST /register
router.post('/', userController.postRegister)

module.exports = router;