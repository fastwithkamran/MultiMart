import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
};

const eventReducer = createReducer(initialState, (builder) => {
  builder
    // event creation
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFailure", (state, action) => {
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

    // get all events of a shop
    .addCase("getAllEventsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase("getAllEventsShopFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // delete event of a shop
    .addCase("deleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.message = action.payload;
    })
    .addCase("deleteEventFailure", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })

    // get all events
    .addCase("getAllEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase("getAllEventsFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});

export const clearErrors = () => ({ type: "clearErrors" });
export const resetSuccess = () => ({ type: "resetSuccess" });
export default eventReducer;
