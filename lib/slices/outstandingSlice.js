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
  curBranch: "Select a Branch",
  curCat: "All Category",
  particulars: [],
  curParticular: "All Particular",
  curBank: "All Banks",
};

const outstandingSlice = createSlice({
  name: "outstanding",

  initialState,
  reducers: {
    setOutBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setOutstandingCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsOutstandingNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
    setOutstandingSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setOutstandingIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setOutstandingCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setOutstandingCurCat(state, action) {
      state.curCat = action.payload;
    },
    setOutstandingCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setOutstandingParticular(state, action) {
      state.particulars = action.payload;
    },
    setOutstandingCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setOutstandingCurrentPage,
  setOutBtnDisable,
  setIsOutstandingNewEntry,
  setOutstandingIsEdit,
  setOutstandingCurBranch,
  setOutstandingCurCat,
  setOutstandingCurParticular,
  setOutstandingParticular,
  setOutstandingCurBank,
} = outstandingSlice.actions;
export default outstandingSlice.reducer;
