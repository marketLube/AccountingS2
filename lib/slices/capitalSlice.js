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
  isNewEntry: false,
  selectedItems: {},
  isEdit: false,
  particulars: [],
  curBranch: "Select a Branch",
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "Reset",
  dateOptions,
  curType: "All Type",
  summery: {},
};

const capitalSlice = createSlice({
  name: "capital",

  initialState,
  reducers: {
    setCapitalSummery(state, action) {
      state.summery = action.payload;
    },
    setCapitalType(state, action) {
      state.curType = action.payload;
    },
    setCapitalSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);
    },
    setCapitalStartDate(state, action) {
      state.capitalStartDate = action.payload;
      state.selectedDate = "Reset";
    },
    setCapitalEndDate(state, action) {
      state.capitalEndDate = action.payload;
      state.selectedDate = "Reset";
    },

    setCapitalBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setCapitalCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsCapitalNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
    setCapitalSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setCapitalIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setCapitalCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setCapitalCurCat(state, action) {
      state.curCat = action.payload;
    },
    setCapitalCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setCapitalParticular(state, action) {
      state.particulars = action.payload;
    },
    setCapitalCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setCapitalCurrentPage,
  setCapitalBtnDisable,
  setIsCapitalNewEntry,
  setCapitalSelectedItems,
  setCapitalIsEdit,
  setCapitalCurBranch,
  setCapitalCurCat,
  setCapitalCurParticular,
  setCapitalParticular,
  setCapitalCurBank,
  setCapitalSelectedDate,
  setCapitalStartDate,
  setCapitalEndDate,
  setCapitalType,
  setCapitalSummery,
} = capitalSlice.actions;
export default capitalSlice.reducer;
