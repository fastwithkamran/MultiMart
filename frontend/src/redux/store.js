import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.js";
import { cartReducer } from "./reducers/cart.js";

const Store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  devTools: true,
});

export default Store;
