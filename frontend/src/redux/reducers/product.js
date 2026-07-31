import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("resetSuccess", (state) => {
      state.success = false;
    });
});

export const clearErrors = () => ({ type: "clearErrors" });
export const resetSuccess = () => ({ type: "resetSuccess" });
export default productReducer;
