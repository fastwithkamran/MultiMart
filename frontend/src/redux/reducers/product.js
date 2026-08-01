import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
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
    })

    // get all products
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getAllProductsShopFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // delete product of a shop
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.message = action.payload;
    })
    .addCase("deleteProductFailure", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    });
});

export const clearErrors = () => ({ type: "clearErrors" });
export const resetSuccess = () => ({ type: "resetSuccess" });
export default productReducer;
