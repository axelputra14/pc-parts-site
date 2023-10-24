const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const customerProductController = require("../controllers/customerProductController");

router.post("/login", customerController.loginCustomer);
router.post("/register", customerController.postRegister);
router.get("/product", customerProductController.fetchProduct);
router.get("/product/:id", customerProductController.getProductDetail);

module.exports = router;
