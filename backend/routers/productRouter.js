const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const {
  handleCreateProduct,
  handleGetShopProducts,
} = require("../controllers/product");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

router.post("/create-product", upload.array("images"), handleCreateProduct);

router.get("/get-all-products-shop/:id", handleGetShopProducts);

module.exports = router;
