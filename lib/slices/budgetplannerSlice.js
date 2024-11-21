import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";
import formatDate, { today } from "@/app/_services/helpers";
import { dateOptions } from "@/app/data/generalDatas";
import { dateFinder } from "@/app/_services/finders";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  isNewEntry: false,
  propertyNames: [],
  selectedItems: {},
  isEdit: false,
  particulars: [],
  curBranch: "All Branches",
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "Reset",
  dateOptions,
  curRange: "One Month",
};

const budgetplannerSlice = createSlice({
  name: "budgetplanner",

  initialState,
  reducers: {
    setCurRange(state, action) {
      state.curRange = action.payload;
    },
    setBudgetplannerSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);
    },
    setBudgetplannerStartDate(state, action) {
      state.budgetplannerStartDate = action.payload;
      state.selectedDate = "Reset";
    },
    setBudgetplannerEndDate(state, action) {
      state.budgetplannerEndDate = action.payload;
      state.selectedDate = "Reset";
    },

    setBudgetplannerBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setBudgetplannerCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsBudgetplannerNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
    setPropertyNames(state, action) {
      state.propertyNames = action.payload;
    },
    setBudgetplannerSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setBudgetplannerIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setBudgetplannerCurBranch(state, action) {
      state.curBranch = action.payload;
    },
  },
});

export const {
  setBudgetplannerCurrentPage,
  setBudgetplannerBtnDisable,
  setIsBudgetplannerNewEntry,
  setPropertyNames,
  setBudgetplannerSelectedItems,
  setBudgetplannerIsEdit,
  setBudgetplannerCurBranch,
  setBudgetplannerSelectedDate,
  setBudgetplannerStartDate,
  setBudgetplannerEndDate,
  setCurRange,
} = budgetplannerSlice.actions;
export default budgetplannerSlice.reducer;
