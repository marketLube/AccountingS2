import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  selectedItems: {},
  isEdit: false,
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
    setLedgerSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setLedgerIsEdit(state, action) {
      state.isEdit = action.payload;
    },
  },
});

export const {
  setLedgerCurrentPage,
  setLedgerBtnDisable,
  setLedgerSelectedItems,
  setLedgerIsEdit,
} = ledgerSlice.actions;
export default ledgerSlice.reducer;
