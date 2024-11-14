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
  curCat: "All Category",
  curParticular: "All Particular",
  curBank: "All Banks",
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "Reset",
  dateOptions,
};

const liabilitySlice = createSlice({
  name: "liability",

  initialState,
  reducers: {
    setLiabilitySelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);

      console.log(state.endDate, "solve");
      console.log(state.startDate, "Solve");
    },
    setLiabilityStartDate(state, action) {
      state.dayBookStartDate = action.payload;
      state.selectedDate = "Reset";
    },
    setLiabilityEndDate(state, action) {
      state.dayBookEndDate = action.payload;
      state.selectedDate = "Reset";
    },

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
    setLiabilityCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setLiabilityCurCat(state, action) {
      state.curCat = action.payload;
    },
    setLiabilityCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setLiabilityParticular(state, action) {
      state.particulars = action.payload;
    },
    setLiabilityCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setliabilityCurrentPage,
  setLiabBtnDisable,
  setIsLiabilityNewEntry,
  setLiabilitySelectedItems,
  setLiabilityIsEdit,
  setLiabilityCurBranch,
  setLiabilityCurCat,
  setLiabilityCurParticular,
  setLiabilityParticular,
  setLiabilityCurBank,
  setLiabilitySelectedDate,
  setLiabilityStartDate,
  setLiabilityEndDate,
} = liabilitySlice.actions;
export default liabilitySlice.reducer;
