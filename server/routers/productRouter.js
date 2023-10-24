const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  authorizationProduct,
  statusUpdateAuth,
} = require("../middlewares/authorization");

router.get("/", productController.readProduct);
router.post("/", productController.addProduct);
//router.get("/:id", productController.productDetail);
//statusUpdateAuth
router.patch("/:id", statusUpdateAuth, productController.updateProductStatus);
router.put("/:id", productController.updateProduct);
//router.delete("/:id", authorizationProduct, productController.deleteProduct);

module.exports = router;
