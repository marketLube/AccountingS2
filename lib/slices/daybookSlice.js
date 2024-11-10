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
  isEdit: false,
  curBranch: "Select a Branch",
  curCat: "All Category",
};

const daybookSlice = createSlice({
  name: "daybook",

  initialState,
  reducers: {
    setDaybookCurCat(state, action) {
      state.curCat = action.payload;
    },
    setDaybookCurBranch(state, action) {
      state.curBranch = action.payload;
    },
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
    setDaybookIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setDaybookSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
  },
});

export const {
  setDaybookCurrentPage,
  setBtnDisable,
  setDaybookIsEdit,
  setDaybookType,
  setIsDaybookNewEntri,
  setDaybookSelectedItems,
  setDaybookCurBranch,
  setDaybookCurCat,
} = daybookSlice.actions;
export default daybookSlice.reducer;
