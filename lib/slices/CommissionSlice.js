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

const commissionSlice = createSlice({
  name: "commission",

  initialState,
  reducers: {
    setResetCommissionDate(state, action) {
      state.startDate = formatDate(new Date(new Date().getFullYear(), 0, 1));
      state.endDate = today();
    },
    setCommissionSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);

      console.log(state.endDate, "solve");
      console.log(state.startDate, "Solve");
    },
    setCommissionStartDate(state, action) {
      state.commissionStartDate = action.payload;
      state.selectedDate = "Reset";
    },
    setCommissionEndDate(state, action) {
      state.commissionEndDate = action.payload;
      state.selectedDate = "Reset";
    },

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
    setCommissionCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setCommissionCurCat(state, action) {
      state.curCat = action.payload;
    },
    setCommissionCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setCommissionParticular(state, action) {
      state.particulars = action.payload;
    },
    setCommissionCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setCommissionCurrentPage,
  setCommissionBtnDisable,
  setIsCommissionNewEntry,
  setCommissionSelectedItems,
  setCommissionIsEdit,
  setCommissionCurBranch,
  setCommissionCurCat,
  setCommissionCurParticular,
  setCommissionParticular,
  setCommissionCurBank,
  setCommissionSelectedDate,
  setCommissionStartDate,
  setCommissionEndDate,
  setResetCommissionDate,
} = commissionSlice.actions;
export default commissionSlice.reducer;
