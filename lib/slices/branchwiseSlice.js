import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
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
  },
});

export const { setBranchwiseCurrentPage, setBranchwiseBtnDisable } =
  branchWiseSlice.actions;
export default branchWiseSlice.reducer;
