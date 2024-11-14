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
  curBranch: "Select a Branch",
  curCat: "All Category",
  curParticular: "All Particular",
  curBank: "All Banks",
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "Reset",
  dateOptions,
};

const budgetplannerSlice = createSlice({
  name: "budgetplanner",

  initialState,
  reducers: {
    setBudgetplannerSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);

      console.log(state.endDate, "solve");
      console.log(state.startDate, "Solve");
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
    setBudgetplannerCurCat(state, action) {
      state.curCat = action.payload;
    },
    setBudgetplannerCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setBudgetplannerParticular(state, action) {
      state.particulars = action.payload;
    },
    setBudgetplannerCurBank(state, action) {
      state.curBank = action.payload;
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
  setBudgetplannerCurCat,
  setBudgetplannerCurParticular,
  setBudgetplannerParticular,
  setBudgetplannerCurBank,
  setBudgetplannerSelectedDate,
  setBudgetplannerStartDate,
  setBudgetplannerEndDate,
} = budgetplannerSlice.actions;
export default budgetplannerSlice.reducer;
