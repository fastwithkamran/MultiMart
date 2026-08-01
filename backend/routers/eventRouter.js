const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const { isAuthenticatedSeller } = require("../utils/auth");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

const {
  handleCreateEvent,
  handleGetShopEvents,
  handleDeleteEvent,
} = require("../controllers/event");

router.post("/create-event", upload.array("images"), handleCreateEvent);

router.get("/get-all-events/:id", handleGetShopEvents);

router.delete(
  "/delete-shop-event/:id",
  isAuthenticatedSeller,
  handleDeleteEvent,
);

module.exports = router;
