const Product = require("../models/product");
const Shop = require("../models/shop.js");

const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const fs = require("fs");

const handleCreateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop ID is invalid!", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map(
        (file) => `${req.protocol}://${req.get("host")}/${file.filename}`,
      );
      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// get all products of a shop
const handleGetShopProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// delete product
const handleDeleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = await Product.findById(productId);

    if (!productData) {
      return next(new ErrorHandler("Product not found with this id", 400));
    }

    productData.images.forEach((imageUrl) => {
      const filename = new URL(imageUrl).pathname.split("/").pop();
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting images", err);
          return next(new ErrorHandler("Product Images cannot deleted", 500));
        }
      });
    });

    const product = await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = {
  handleCreateProduct,
  handleGetShopProducts,
  handleDeleteProduct,
};
