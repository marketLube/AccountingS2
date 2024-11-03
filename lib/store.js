// store/store.js
import { configureStore } from "@reduxjs/toolkit";

// Example: import your reducers here
import generalSlice from "./slices/generalSlice";
import daybookSlice from "./slices/daybookSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
    daybook: daybookSlice,
  },
});

export default store;
