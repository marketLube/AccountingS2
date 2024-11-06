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

const commissionSlice = createSlice({
  name: "commission",

  initialState,
  reducers: {
    setCommissionBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setCommissionCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsCommissionNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
  },
});

export const {
  setCommissionCurrentPage,
  setCommissionBtnDisable,
  setIsCommissionNewEntry,
} = commissionSlice.actions;
export default commissionSlice.reducer;
