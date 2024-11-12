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
};

const branchWiseSlice = createSlice({
  name: "branchwise",

  initialState,
  reducers: {
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
  },
});

export const {
  setBranchwiseCurrentPage,
  setBranchwiseBtnDisable,
  setBranchWiseCurBranch,
  setBranchwiseSelectedItems,
  setBranchwiseIsEdit,
} = branchWiseSlice.actions;
export default branchWiseSlice.reducer;
