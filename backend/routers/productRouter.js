const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const {
  handleCreateProduct,
  handleGetShopProducts,
  handleDeleteProduct,
} = require("../controllers/product");

const { isAuthenticatedSeller } = require("../utils/auth");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

router.post("/create-product", upload.array("images"), handleCreateProduct);

router.get("/get-all-products-shop/:id", handleGetShopProducts);

router.delete(
  "/delete-shop-product/:id",
  isAuthenticatedSeller,
  handleDeleteProduct,
);

module.exports = router;
