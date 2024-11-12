import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  isNewEntry: false,
  selectedItems: {},
  isEdit: false,
};

const reminderSlice = createSlice({
  name: "reminder",

  initialState,
  reducers: {
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
  },
});

export const {
  setReminderCurentPage,
  setRemBtnDiable,
  setIsReminderNewEntry,
  setReminderIsEdit,
  setReminderSelectedItems,
} = reminderSlice.actions;
export default reminderSlice.reducer;
