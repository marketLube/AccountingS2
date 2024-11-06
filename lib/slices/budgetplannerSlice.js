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

const budgetplannerSlice = createSlice({
  name: "budgetplanner",

  initialState,
  reducers: {
    setBudgetplannerBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setBudgetplannerCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsBudgetplannerNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
  },
});

export const {
  setBudgetplannerCurrentPage,
  setBudgetplannerBtnDisable,
  setIsBudgetplannerNewEntry,
} = budgetplannerSlice.actions;
export default budgetplannerSlice.reducer;
