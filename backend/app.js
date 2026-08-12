const express = require("express");
const ErrorHandler = require("./middlewares/error.js");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDatabase = require("./db/Database.js");

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://multi-vendor-fastwithkamran.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// connect DB
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error("DB connection error", err.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

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

// route path
app.get("/", (req, res) => {
  res.send("Server Connected Successfully!");
});
// server check path via Uptime Robot
app.use("/api/check", (req, res) => {
  res.status(200).json({ success: true, status: "OK" });
});

// error handling
app.use(ErrorHandler);

module.exports = app;
