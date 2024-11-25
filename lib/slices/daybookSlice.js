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
  banktobankbtnDisable: false,
  type: "All Status",
  selectedItems: {},
  isNewEntry: false,
  isEdit: false,
  curBranch: "All Branches",
  curCat: "All Category",
  particulars: [],
  curParticular: "All Particular",
  curBank: "All Banks",
  summery: {},
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "All",
  dateOptions,
};

const daybookSlice = createSlice({
  name: "daybook",

  initialState,
  reducers: {
    resetDaybookDates(state, action) {
      state.startDate = formatDate(new Date(new Date().getFullYear(), 0, 1));
      state.endDate = today();
    },
    setDayBookSelectedDate(state, action) {
      state.selectedDate = action.payload;
      console.log(action.payload, "sl");
      const { startDate, endDate } = dateFinder(state.selectedDate) || {};
      console.log(startDate, endDate, "s", "e");
      if (startDate && action.payload !== "Custom") {
        state.startDate = formatDate(startDate);
      }
      if (endDate) {
        state.endDate = formatDate(endDate);
      }
    },
    setDayBookStartDate(state, action) {
      state.dayBookStartDate = action.payload;
      state.selectedDate = "Custom";
    },
    setDayBookEndDate(state, action) {
      state.dayBookEndDate = action.payload;
      state.selectedDate = "Custom";
    },
    setDaybookCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setDaybookParticular(state, action) {
      state.particulars = action.payload;
    },
    setDaybookCurCat(state, action) {
      state.curCat = action.payload;
    },
    setDaybookCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setBanktoBankBtnDisable(state, action) {
      state.banktobankbtnDisable = action.payload;
    },
    setDaybookType(state, action) {
      state.type = action.payload;
    },
    setDaybookCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsDaybookNewEntri(state, action) {
      state.isNewEntry = action.payload;
    },
    setDaybookIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setDaybookSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setDaybookCurBank(state, action) {
      state.curBank = action.payload;
    },
    setDaybookSummery(state, action) {
      state.summery = action.payload;
    },
  },
});

export const {
  setDaybookCurBank,
  setDaybookCurrentPage,
  setBtnDisable,
  setDaybookIsEdit,
  setDaybookType,
  setIsDaybookNewEntri,
  setDaybookSelectedItems,
  setDaybookCurBranch,
  setDaybookCurCat,
  setDaybookParticular,
  setDaybookCurParticular,
  setDaybookSummery,
  setDayBookStartDate,
  setDayBookEndDate,
  setDayBookSelectedDate,
  resetDaybookDates,
  setBanktoBankBtnDisable,
} = daybookSlice.actions;
export default daybookSlice.reducer;
