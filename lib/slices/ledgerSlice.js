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
  particulars: [],
  curBranch: "Select a Branch",
  curCat: "All Category",
  summery: {},
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "All",
  dateOptions,
  isSelected: false,
  clickedParticular: {},
};

const ledgerSlice = createSlice({
  name: "ledger",

  initialState,
  reducers: {
    setClickedParticular(state, action) {
      state.clickedParticular = action.payload;
    },
    setResetLedgerDate(state, action) {
      state.startDate = formatDate(new Date(new Date().getFullYear(), 0, 1));
      state.endDate = today();
    },
    setLedgerSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate) || {};
      if (startDate && action.payload !== "Custom") {
        state.startDate = formatDate(startDate);
      }
      if (endDate) {
        state.endDate = formatDate(endDate);
      }
    },
    setLedgerStartDate(state, action) {
      state.ledgerStartDate = action.payload;
      state.selectedDate = "Custom";
    },
    setLedgerEndDate(state, action) {
      state.ledgerSliceedgerEndDate = action.payload;
      state.selectedDate = "Custom";
    },
    setIsSelected(state, action) {
      state.isSelected = action.payload;
    },
    setLedgerBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setLedgerCurrentPage(state, action) {
      setCurrentPage(state, action);
    },

    setLedgerCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setLedgerCurCat(state, action) {
      state.curCat = action.payload;
    },
    setLedgerParticular(state, action) {
      state.particulars = action.payload;
    },
    setLedgerSummery(state, action) {
      state.summery = action.payload;
    },
  },
});

export const {
  setLedgerCurrentPage,
  setLedgerBtnDisable,
  setLedgerCurBranch,
  setLedgerCurCat,
  setLedgerCurParticular,
  setLedgerSelectedDate,
  setLedgerStartDate,
  setLedgerEndDate,
  setLedgerSummery,
  setResetLedgerDate,
  setIsSelected,
  setClickedParticular,
} = ledgerSlice.actions;
export default ledgerSlice.reducer;
