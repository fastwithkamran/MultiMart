const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const catchAsyncErrors = require("../utils/catchAsyncErrors");

const {
  handleCreateMessages,
  handleGetMessages,
} = require("../controllers/message");

// create message
router.post(
  "/create-new-message",
  upload.array("images"),
  handleCreateMessages,
);

// get all messages with conversation Id
router.get("/get-all-messages/:id", handleGetMessages);

module.exports = router;
