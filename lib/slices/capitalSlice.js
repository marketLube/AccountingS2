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
    setCapitalSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setCapitalIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setCapitalCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setCapitalCurCat(state, action) {
      state.curCat = action.payload;
    },
    setCapitalCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setCapitalParticular(state, action) {
      state.particulars = action.payload;
    },
    setCapitalCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setCapitalCurrentPage,
  setCapitalBtnDisable,
  setIsCapitalNewEntry,
  setCapitalSelectedItems,
  setCapitalIsEdit,
  setCapitalCurBranch,
  setCapitalCurCat,
  setCapitalCurParticular,
  setCapitalParticular,
  setCapitalCurBank,
} = capitalSlice.actions;
export default capitalSlice.reducer;
