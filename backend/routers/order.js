const { Router } = require("express");
const router = Router();

const catchAsyncErrors = require("../utils/catchAsyncErrors");
const { isAuthenticatedUser } = require("../utils/auth.js");

const { handleOrder, handleGetUserOrders, handleGetShopOrders } = require("../controllers/order.js");

router.post("/create-order", handleOrder);

router.get("/get-all-orders/:userId", handleGetUserOrders);

router.get("/get-shop-orders/:shopId", handleGetShopOrders);

module.exports = router;
