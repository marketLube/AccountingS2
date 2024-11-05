// store/store.js
import { configureStore } from "@reduxjs/toolkit";

// Example: import your reducers here
import generalSlice from "./slices/generalSlice";
import daybookSlice from "./slices/daybookSlice";
import outstandingSlice from "./slices/outstandingSlice";
import liabilitySlice from "./slices/liabilitySlice";
import reminderSlice from "./slices/reminderSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
    daybook: daybookSlice,
    outstanding: outstandingSlice,
    liability: liabilitySlice,
    reminder: reminderSlice,
  },
});

export default store;
