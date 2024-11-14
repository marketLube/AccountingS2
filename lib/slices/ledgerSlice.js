import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";
import formatDate, { today } from "@/app/_services/helpers";
import { dateOptions } from "@/app/data/generalDatas";
import { dateFinder } from "@/app/_services/finders";

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
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "Reset",
  dateOptions,
};

const ledgerSlice = createSlice({
  name: "ledger",

  initialState,
  reducers: {
    setLedgerSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);

      console.log(state.endDate, "solve");
      console.log(state.startDate, "Solve");
    },
    setLedgerStartDate(state, action) {
      state.ledgerStartDate = action.payload;
      state.selectedDate = "Reset";
    },
    setLedgerEndDate(state, action) {
      state.ledgerSliceedgerEndDate = action.payload;
      state.selectedDate = "Reset";
    },

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
  setLedgerSelectedDate,
  setLedgerStartDate,
  setLedgerEndDate,
} = ledgerSlice.actions;
export default ledgerSlice.reducer;
