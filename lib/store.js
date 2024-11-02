// store/store.js
import { configureStore } from "@reduxjs/toolkit";

// Example: import your reducers here
import generalSlice from "./slices/generalSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
  },
});

export default store;
