import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
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
  },
});

export const { setCapitalCurrentPage, setCapitalBtnDisable } =
  capitalSlice.actions;
export default capitalSlice.reducer;
