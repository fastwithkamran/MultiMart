const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
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
app.use("/user", userRoute);

// error handling
app.use(ErrorHandler);

module.exports = app;
