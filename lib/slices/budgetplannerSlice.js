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
  selectedDate: "All",
  dateOptions,
  summery: {},
  curRange: "One Month",
  query: "",
};

const budgetplannerSlice = createSlice({
  name: "budgetplanner",

  initialState,
  reducers: {
    setBudgetQuery(state, action) {
      state.query = action.payload;
    },
    setResetBudgetDate(state, action) {
      state.startDate = formatDate(new Date(new Date().getFullYear(), 0, 1));
      state.endDate = today();
    },
    setBudgetPlannerSummery(state, action) {
      state.summery = action.payload;
    },
    setCurRange(state, action) {
      state.curRange = action.payload;
    },
    setBudgetplannerSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate) || {};
      if (startDate && action.payload !== "Custom") {
        state.startDate = formatDate(startDate);
      }
      if (endDate) {
        state.endDate = formatDate(endDate);
      }
    },
    setBudgetplannerStartDate(state, action) {
      state.startDate = action.payload;
      state.selectedDate = "Custom";
    },
    setBudgetplannerEndDate(state, action) {
      state.endDate = action.payload;
      state.selectedDate = "Custom";
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
  setBudgetPlannerSummery,
  setResetBudgetDate,
  setBudgetQuery,
} = budgetplannerSlice.actions;
export default budgetplannerSlice.reducer;
