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
  curParticular: "All Particular",
  curBank: "All Banks",
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
    setLiabilitySelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setLiabilityIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setLiabilityCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setLiabilityCurCat(state, action) {
      state.curCat = action.payload;
    },
    setLiabilityCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setLiabilityCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setliabilityCurrentPage,
  setLiabBtnDisable,
  setIsLiabilityNewEntry,
  setLiabilitySelectedItems,
  setLiabilityIsEdit,
  setLiabilityCurBranch,
  setLiabilityCurCat,
  setLiabilityCurParticular,
  setLiabilityCurBank,
} = liabilitySlice.actions;
export default liabilitySlice.reducer;
