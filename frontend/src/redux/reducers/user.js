import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    // set user information
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFailure", (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })

    // update user information
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.updateProfileSuccess = true;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFailure", (state, action) => {
      state.loading = false;
      state.updateProfileSuccess = false;
      state.updateProfileError = action.payload;
    })
    .addCase("resetUpdateProfileSuccess", (state) => {
      state.updateProfileSuccess = false;
    })
    .addCase("clearUpdateProfileErrors", (state) => {
      state.updateProfileError = null;
    })

    // update user addresses
    .addCase("updateUserAddressRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.loading = false;
      state.addAddressSuccess = true;
      state.user = action.payload;
    })
    .addCase("updateUserAddressFailure", (state, action) => {
      state.loading = false;
      state.addAddressSuccess = false;
      state.addAddressError = action.payload;
    })
    .addCase("clearAddAddressErrors", (state) => {
      state.addAddressError = null;
    })
    .addCase("resetAddAddressSuccess", (state) => {
      state.addAddressSuccess = false;
    })

    // delete user address
    .addCase("deleteUserAddressRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.loading = false;
      state.deleteAddressSuccess = true;
      state.user = action.payload;
    })
    .addCase("deleteUserAddressFailure", (state, action) => {
      state.loading = false;
      state.deleteAddressSuccess = false;
      state.deleteAddressError = action.payload;
    })
    .addCase("clearDeleteAddressErrors", (state) => {
      state.deleteAddressError = null;
    })
    .addCase("resetDeleteAddressSuccess", (state) => {
      state.deleteAddressSuccess = false;
    });
});

export const clearErrors = () => ({ type: "clearErrors" });

export const clearUpdateProfileErrors = () => ({
  type: "clearUpdateProfileErrors",
});
export const resetUpdateProfileSuccess = () => ({
  type: "resetUpdateProfileSuccess",
});

export const clearAddAddressErrors = () => ({ type: "clearAddAddressErrors" });
export const resetAddAddressSuccess = () => ({
  type: "resetAddAddressSuccess",
});

export const clearDeleteAddressErrors = () => ({
  type: "clearDeleteAddressErrors",
});
export const resetDeleteAddressSuccess = () => ({
  type: "resetDeleteAddressSuccess",
});

export default userReducer;
