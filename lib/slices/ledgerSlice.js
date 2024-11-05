import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
};

const ledgerSlice = createSlice({
  name: "ledger",

  initialState,
  reducers: {
    setLedgerBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setLedgerCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
  },
});

export const { setLedgerCurrentPage, setLedgerBtnDisable } =
  ledgerSlice.actions;
export default ledgerSlice.reducer;
