import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.js";
import sellerReducer from "./reducers/seller.js";
import { cartReducer } from "./reducers/cart.js";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    cart: cartReducer,
  },
  devTools: true,
});

export default Store;
