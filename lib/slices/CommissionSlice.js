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

const commissionSlice = createSlice({
  name: "commission",

  initialState,
  reducers: {
    setCommissionBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setCommissionCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsCommissionNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
    setCommissionSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setCommissionIsEdit(state, action) {
      state.isEdit = action.payload;
    },
  },
});

export const {
  setCommissionCurrentPage,
  setCommissionBtnDisable,
  setIsCommissionNewEntry,
  setCommissionSelectedItems,
  setCommissionIsEdit,
} = commissionSlice.actions;
export default commissionSlice.reducer;
