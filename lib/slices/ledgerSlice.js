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
  particulars: [],
  curBranch: "Select a Branch",
  curCat: "All Category",
  curParticular: "All Particular",
  curBank: "All Banks",
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
    setLedgerCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setLedgerCurCat(state, action) {
      state.curCat = action.payload;
    },
    setLedgerCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setLedgerParticular(state, action) {
      state.particulars = action.payload;
    },
    setLedgerCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setLedgerCurrentPage,
  setLedgerBtnDisable,
  setLedgerSelectedItems,
  setLedgerIsEdit,
  setLedgerCurBranch,
  setLedgerCurCat,
  setLedgerCurParticular,
  setLedgerParticular,
  setLedgerCurBank,
} = ledgerSlice.actions;
export default ledgerSlice.reducer;
