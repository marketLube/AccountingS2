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
  curBranch: "All Branches",
  summery: {},
  curStatus: "All Status",
  curBranch: "All Branch",
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
    setCommissionCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setCommissionCurBank(state, action) {
      state.curBank = action.payload;
    },
    setCommitionSummery(state, action) {
      state.summery = action.payload;
      console.log(action.payload, ";;;;;;;;;;;;");
    },
    setCommitionStatus(state, action) {
      state.curStatus = action.payload;
    },
  },
});

export const {
  setCommitionStatus,
  setCommissionCurrentPage,
  setCommissionBtnDisable,
  setIsCommissionNewEntry,
  setCommissionSelectedItems,
  setCommissionIsEdit,
  setCommissionCurBranch,
  setCommissionCurBank,
  setCommitionSummery,
} = commissionSlice.actions;
export default commissionSlice.reducer;
