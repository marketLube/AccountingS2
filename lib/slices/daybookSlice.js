import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  type: "All Status",
  selectedItems: {},
  isNewEntry: false,
};

const daybookSlice = createSlice({
  name: "daybook",

  initialState,
  reducers: {
    setBtnDisable(state, action) {
      state.btnDisable = action.payload;
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
    setDaybookSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
  },
});

export const {
  setDaybookCurrentPage,
  setBtnDisable,
  setDaybookType,
  setIsDaybookNewEntri,
  setDaybookSelectedItems,
} = daybookSlice.actions;
export default daybookSlice.reducer;
