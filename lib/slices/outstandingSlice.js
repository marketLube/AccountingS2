import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  isNewEntry: false,
};

const outstandingSlice = createSlice({
  name: "outstanding",

  initialState,
  reducers: {
    setOutBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setOutstandingCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsOutstandingNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
  },
});

export const {
  setOutstandingCurrentPage,
  setOutBtnDisable,
  setIsOutstandingNewEntry,
} = outstandingSlice.actions;
export default outstandingSlice.reducer;
