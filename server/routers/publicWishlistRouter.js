const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.get("/", wishlistController.fetchWishlist);
router.post("/:id", wishlistController.addToWishlist);

module.exports = router;
