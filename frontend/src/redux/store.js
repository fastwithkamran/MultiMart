import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.js";
import sellerReducer from "./reducers/seller.js";
import cartReducer from "./reducers/cart.js";
import productReducer from "./reducers/product.js";
import eventReducer from "./reducers/event.js"

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    cart: cartReducer,
    product: productReducer,
    event: eventReducer,
  },
  devTools: true,
});

export default Store;
