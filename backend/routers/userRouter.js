const { Router } = require("express");
const router = Router();
const path = require("path");
const { upload } = require("../multer.js");
const { handleCreateUser, handleActivateUser, handleUserLogin } = require("../controllers/user");
const { isAuthenticated } = require("../utils/auth.js");

router.post("/create-user", upload.single("file"), handleCreateUser);
router.post("/activation", handleActivateUser);
router.post("/login", handleUserLogin);

router.get("/getuser", isAuthenticated, );

module.exports = router;
