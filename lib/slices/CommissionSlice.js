import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  isNewEntry: false,
  selectedItems: {},
  isEdit: false,
  particulars: [],
  curBranch: "Select a Branch",
  curCat: "All Category",
  curParticular: "All Particular",
  curBank: "All Banks",
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
    setCommissionSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setCommissionIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setCommissionCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setCommissionCurCat(state, action) {
      state.curCat = action.payload;
    },
    setCommissionCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setCommissionParticular(state, action) {
      state.particulars = action.payload;
    },
    setCommissionCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setCommissionCurrentPage,
  setCommissionBtnDisable,
  setIsCommissionNewEntry,
  setCommissionSelectedItems,
  setCommissionIsEdit,
  setCommissionCurBranch,
  setCommissionCurCat,
  setCommissionCurParticular,
  setCommissionParticular,
  setCommissionCurBank,
} = commissionSlice.actions;
export default commissionSlice.reducer;
