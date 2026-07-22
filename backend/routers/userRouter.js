const { Router } = require("express");
const router = Router();
const path = require("path");
const { upload } = require("../multer.js");
const { handleCreateUser, handleActivateUser } = require("../controllers/user");

router.post("/create-user", upload.single("file"), handleCreateUser);
router.post("/activation", handleActivateUser);

module.exports = router;
