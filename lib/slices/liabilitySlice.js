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

const liabilitySlice = createSlice({
  name: "liability",

  initialState,
  reducers: {
    setLiabBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setliabilityCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsLiabilityNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
  },
});

export const {
  setliabilityCurrentPage,
  setLiabBtnDisable,
  setIsLiabilityNewEntry,
} = liabilitySlice.actions;
export default liabilitySlice.reducer;
