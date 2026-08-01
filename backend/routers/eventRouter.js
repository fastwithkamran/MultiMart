const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const { isAuthenticatedSeller } = require("../utils/auth");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

const handleCreateEvent = require("../controllers/event");

router.post("/create-event", upload.array("images"), handleCreateEvent);

module.exports = router;
