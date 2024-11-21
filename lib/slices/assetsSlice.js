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
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "Reset",
  dateOptions,
  curType: "All Type",
  summery: {},
};

const assetsSlice = createSlice({
  name: "assets",

  initialState,
  reducers: {
    setAssetsSummery(state, action) {
      state.summery = action.payload;
    },
    setAssetsType(state, action) {
      state.curType = action.payload;
    },
    setAssetsSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);
    },
    setAssetsStartDate(state, action) {
      state.assetsStartDate = action.payload;
      state.selectedDate = "Reset";
    },
    setAssetsEndDate(state, action) {
      state.assetsEndDate = action.payload;
      state.selectedDate = "Reset";
    },

    setAssetsBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setAssetsCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsAssetsNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
    setAssetsSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setAssetsIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setAssetsCurBranch(state, action) {
      state.curBranch = action.payload;
    },
  },
});

export const {
  setAssetsCurrentPage,
  setAssetsBtnDisable,
  setIsAssetsNewEntry,
  setAssetsSelectedItems,
  setAssetsIsEdit,
  setAssetsCurBranch,
  setAssetsSelectedDate,
  setAssetsStartDate,
  setAssetsEndDate,
  setAssetsType,
  setAssetsSummery,
} = assetsSlice.actions;
export default assetsSlice.reducer;
