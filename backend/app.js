const express = require("express");
const ErrorHandler = require("./middlewares/error.js");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// routes
const userRoute = require("./routers/userRouter.js");
const shopRoute = require("./routers/shopRouter.js");
const productRoute = require("./routers/productRouter.js");
const eventRoute = require("./routers/eventRouter.js");
const couponCodeRoute = require("./routers/couponCodeRouter.js");
const paymentRoute = require("./routers/payment.js");
const orderRoute = require("./routers/order.js");
const conversationRoute = require("./routers/conversationRouter.js");
const messageRoute = require("./routers/messageRouter.js");
app.use("/api/v1/user", userRoute);
app.use("/api/v1/shop", shopRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/couponCode", couponCodeRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/conversation", conversationRoute);
app.use("/api/v1/message", messageRoute);

// error handling
app.use(ErrorHandler);

module.exports = app;
