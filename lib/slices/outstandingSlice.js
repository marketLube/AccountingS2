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
  curBranch: "Select a Branch",
  curCat: "All Category",
  particulars: [],
  curParticular: "All Particular",
  curBank: "All Banks",
  summery: {},
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "Reset",
  dateOptions,
};

const outstandingSlice = createSlice({
  name: "outstanding",

  initialState,
  reducers: {
    setOutstandingSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);
    },
    setOutstandingStartDate(state, action) {
      state.outstandingStartDate = action.payload;
      state.selectedDate = "Reset";
    },
    setOutstandingEndDate(state, action) {
      state.outstandingEndDate = action.payload;
      state.selectedDate = "Reset";
    },

    setOutBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setOutstandingCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsOutstandingNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
    setOutstandingSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setOutstandingIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setOutstandingCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setOutstandingCurCat(state, action) {
      state.curCat = action.payload;
    },
    setOutstandingCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setOutstandingParticular(state, action) {
      state.particulars = action.payload;
    },
    setOutstandingCurBank(state, action) {
      state.curBank = action.payload;
    },
    setOutstandingSummery(state, action) {
      state.summery = action.payload;
    },
  },
});

export const {
  setOutstandingCurrentPage,
  setOutBtnDisable,
  setIsOutstandingNewEntry,
  setOutstandingIsEdit,
  setOutstandingCurBranch,
  setOutstandingCurCat,
  setOutstandingCurParticular,
  setOutstandingParticular,
  setOutstandingCurBank,
  setOutstandingSelectedDate,
  setOutstandingStartDate,
  setOutstandingEndDate,
  setOutstandingSummery,
} = outstandingSlice.actions;
export default outstandingSlice.reducer;
