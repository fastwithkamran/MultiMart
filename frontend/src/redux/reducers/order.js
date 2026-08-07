import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const orderReducer = createReducer(initialState, (builder) => {
  builder
    // user orders
    .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersUserFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export default orderReducer;
