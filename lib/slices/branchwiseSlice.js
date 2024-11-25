import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  summery: {},
  isEdit: false,
  type: "All Status",
  curBranch: "All Branches",
  curCat: "All Category",
  particulars: [],
  curBranch: "All Branches",
  curCat: "All Category",
  curParticular: "All Particular",
  curBank: "All Banks",
};

const branchWiseSlice = createSlice({
  name: "branchwise",

  initialState,
  reducers: {
    setBranchWiseSummery(state, action) {
      state.summery = action.payload;
    },
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
    setBranchwiseIsEdit(state, action) {
      state.isEdit = action.payload;
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
  setBranchwiseIsEdit,
  setBranchwiseCurBranch,
  setBranchwiseCurCat,
  setBranchwiseCurParticular,
  setBranchwiseParticular,
  setBranchwiseCurBank,
  setResetBranchwiseDate,
  setBranchWiseSummery,
} = branchWiseSlice.actions;
export default branchWiseSlice.reducer;
