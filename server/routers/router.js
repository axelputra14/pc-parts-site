//const express = require("express");
const router = require("express").Router();
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");
const userRouter = require("./userRouter");
const historyRouter = require("./historyRouter");
const publicRouter = require("./publicRouter");
const publicWishlistRouter = require("./publicWishlistRouter");
const authentication = require("../middlewares/authentication");

// ROUTES
router.use("/register", registerRouter);
router.use("/login", loginRouter);

// authentication customer nanti
router.use("/pub", publicRouter);

router.use(authentication);
router.use("/pub/wishlist", publicWishlistRouter);

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/histories", historyRouter);

module.exports = router;
