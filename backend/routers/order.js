const { Router } = require("express");
const router = Router();

const catchAsyncErrors = require("../utils/catchAsyncErrors");
const { isAuthenticatedUser } = require("../utils/auth.js");

const handleOrder = require("../controllers/order.js");

router.post("/create-order", handleOrder);

module.exports = router;
