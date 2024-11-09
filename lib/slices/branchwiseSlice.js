import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  curBranch: "",
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
  },
});

export const {
  setBranchwiseCurrentPage,
  setBranchwiseBtnDisable,
  setBranchWiseCurBranch,
} = branchWiseSlice.actions;
export default branchWiseSlice.reducer;
