import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.js";
import sellerReducer from "./reducers/seller.js";
import cartReducer from "./reducers/cart.js";
import productReducer from "./reducers/product.js";
import eventReducer from "./reducers/event.js";
import wishlistReducer from "./reducers/wishlist.js";
import orderReducer from "./reducers/order.js";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    cart: cartReducer,
    product: productReducer,
    event: eventReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
  devTools: true,
});

export default Store;
