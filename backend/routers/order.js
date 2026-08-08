const { Router } = require("express");
const router = Router();

const catchAsyncErrors = require("../utils/catchAsyncErrors");
const {
  isAuthenticatedUser,
  isAuthenticatedSeller,
} = require("../utils/auth.js");

const {
  handleOrder,
  handleGetUserOrders,
  handleGetShopOrders,
  handleUpdateOrderStatus,
  handleRefundRequest,
} = require("../controllers/order.js");
// create an order
router.post("/create-order", handleOrder);
// get all customer orders
router.get("/get-all-orders/:userId", handleGetUserOrders);
// get all shop orders
router.get("/get-shop-orders/:shopId", handleGetShopOrders);
// update order status for shop
router.put(
  "/update-order-status/:id",
  isAuthenticatedSeller,
  handleUpdateOrderStatus,
);
// order refund request
router.put("/order-refund/:id", handleRefundRequest);

module.exports = router;
