const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

const Order = require("../models/order.js");
const Product = require("../models/product.js");

const handleOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    // group cart items by shopId since an order contains items from different shops
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;

      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });

      orders.push({ order });
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// get all orders of user
const handleGetUserOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// get all orders of seller
const handleGetShopOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ "cart.shopId": req.params.shopId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// update order status
const handleUpdateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id);

    if (!orders) return next(new ErrorHandler("Order is not found", 400));

    // update the order status
    orders.status = req.body.status;

    // if order is delivered update the delivery date and payment status
    if (req.body.status === "Delivered") {
      orders.deliveredAt = Date.now();
      orders.paymentInfo.status = "Succeeded";
    }

    // if product is dispatch then update the stock and sold out number
    if (req.body.status === "Transferred to delivery partner") {
      orders.cart.forEach(async (order) => {
        await updateProduct(order._id, order.qty);
      });
    }

    async function updateProduct(id, qty) {
      const product = await Product.findById(id);

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }

    await orders.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error, 500));
  }
});

// handle refund requests
const handleRefundRequest = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id);

    if (!orders) return next(new ErrorHandler("Order is not found", 400));

    // update the order status
    orders.status = req.body.status;

    await orders.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error, 500));
  }
});

// proceedings of refund order --- for shop
const handleRefundProceedings = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id);

    if (!orders) return next(new ErrorHandler("Order is not found", 400));

    // update the order status
    orders.status = req.body.status;

    if (req.body.status === "Refund approve") {
      orders.cart.forEach(async (order) => {
        await updateProduct(order._id, order.qty);
      });
    }

    async function updateProduct(id, qty) {
      const product = await Product.findById(id);

      product.stock += qty;
      product.sold_out -= qty;

      await product.save({ validateBeforeSave: false });
    }

    await orders.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = {
  handleOrder,
  handleGetUserOrders,
  handleGetShopOrders,
  handleUpdateOrderStatus,
  handleRefundRequest,
  handleRefundProceedings,
};
