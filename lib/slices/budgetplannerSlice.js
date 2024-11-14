import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

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
} = budgetplannerSlice.actions;
export default budgetplannerSlice.reducer;
