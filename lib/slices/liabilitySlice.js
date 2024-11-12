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

const liabilitySlice = createSlice({
  name: "liability",

  initialState,
  reducers: {
    setLiabBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setliabilityCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsLiabilityNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
    setLiabilitySelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setLiabilityIsEdit(state, action) {
      state.isEdit = action.payload;
    },
  },
});

export const {
  setliabilityCurrentPage,
  setLiabBtnDisable,
  setIsLiabilityNewEntry,
  setLiabilitySelectedItems,
  setLiabilityIsEdit,
} = liabilitySlice.actions;
export default liabilitySlice.reducer;
