import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
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
  },
});

export const { setOutstandingCurrentPage, setOutBtnDisable, setDaybookType } =
  outstandingSlice.actions;
export default outstandingSlice.reducer;
