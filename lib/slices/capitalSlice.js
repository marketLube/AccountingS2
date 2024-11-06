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

const capitalSlice = createSlice({
  name: "capital",

  initialState,
  reducers: {
    setCapitalBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setCapitalCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsCapitalNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
  },
});

export const {
  setCapitalCurrentPage,
  setCapitalBtnDisable,
  setIsCapitalNewEntry,
} = capitalSlice.actions;
export default capitalSlice.reducer;
