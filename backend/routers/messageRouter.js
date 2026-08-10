const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const catchAsyncErrors = require("../utils/catchAsyncErrors");

const {
  handleCreateMessages,
} = require("../controllers/message");

// create message
router.post(
  "/create-new-message",
  upload.array("images"),
  handleCreateMessages,
);

module.exports = router;
