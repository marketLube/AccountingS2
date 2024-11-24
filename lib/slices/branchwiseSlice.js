import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  curBranch: "",
  selectedItems: {},
  isEdit: false,
  particulars: [],
  curBranch: "Select a Branch",
  curCat: "All Category",
  curParticular: "All Particular",
  curBank: "All Banks",
};

const branchWiseSlice = createSlice({
  name: "branchwise",

  initialState,
  reducers: {
    setResetBranchwiseDate(state, action) {
      state.startDate = formatDate(new Date(new Date().getFullYear(), 0, 1));
      state.endDate = today();
    },
    setBranchwiseBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setBranchwiseCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setBranchWiseCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setBranchwiseSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setBranchwiseIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setBranchwiseCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setBranchwiseCurCat(state, action) {
      state.curCat = action.payload;
    },
    setBranchwiseCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setBranchwiseParticular(state, action) {
      state.particulars = action.payload;
    },
    setBranchwiseCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setBranchwiseCurrentPage,
  setBranchwiseBtnDisable,
  setBranchWiseCurBranch,
  setBranchwiseSelectedItems,
  setBranchwiseIsEdit,
  setBranchwiseCurBranch,
  setBranchwiseCurCat,
  setBranchwiseCurParticular,
  setBranchwiseParticular,
  setBranchwiseCurBank,
  setResetBranchwiseDate,
} = branchWiseSlice.actions;
export default branchWiseSlice.reducer;
