import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";
import formatDate, { today } from "@/app/_services/helpers";
import { dateOptions } from "@/app/data/generalDatas";

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
  curCat: "All Category",
  curParticular: "All Particular",
  curBank: "All Banks",
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "Reset",
  dateOptions,
};

const reminderSlice = createSlice({
  name: "reminder",

  initialState,
  reducers: {
    setReminderSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);
    },
    setReminderStartDate(state, action) {
      state.reminderStartDate = action.payload;
      state.selectedDate = "Reset";
    },
    setReminderEndDate(state, action) {
      state.reminderEndDate = action.payload;
      state.selectedDate = "Reset";
    },

    setRemBtnDiable(state, action) {
      state.btnDisable = action.payload;
    },
    setReminderCurentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsReminderNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
    setReminderIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setReminderSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setReminderCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setReminderCurCat(state, action) {
      state.curCat = action.payload;
    },
    setReminderCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setReminderParticular(state, action) {
      state.particulars = action.payload;
    },
    setReminderCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setReminderCurentPage,
  setRemBtnDiable,
  setIsReminderNewEntry,
  setReminderIsEdit,
  setReminderSelectedItems,
  setReminderCurBranch,
  setReminderCurCat,
  setReminderCurParticular,
  setReminderParticular,
  setReminderCurBank,
  setReminderSelectedDate,
  setReminderStartDate,
  setReminderEndDate,
} = reminderSlice.actions;
export default reminderSlice.reducer;
