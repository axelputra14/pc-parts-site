const express = require("express");
const router = express.Router();
const { authorizationCategory } = require("../middlewares/authorization");
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.readCategory);
router.post("/", categoryController.addCategory);
//router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
