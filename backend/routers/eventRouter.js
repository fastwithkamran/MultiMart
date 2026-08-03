const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const { isAuthenticatedSeller } = require("../utils/auth");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

const {
  handleCreateEvent,
  handleGetShopEvents,
  handleDeleteEvent,
  handleGetAllEvents,
} = require("../controllers/event");

// create event
router.post("/create-event", upload.array("images"), handleCreateEvent);
// get event of a shop
router.get("/get-all-events/:id", handleGetShopEvents);
// delete event of a shop
router.delete(
  "/delete-shop-event/:id",
  isAuthenticatedSeller,
  handleDeleteEvent,
);
// get all events
router.get("/get-all-events", handleGetAllEvents);

module.exports = router;
