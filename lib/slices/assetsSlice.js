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
  selectedDate: "All",
  dateOptions,
  curType: "All Type",
  summery: {},
};

const assetsSlice = createSlice({
  name: "assets",

  initialState,
  reducers: {
    setResetAssetDate(state, action) {
      state.startDate = formatDate(new Date(new Date().getFullYear(), 0, 1));
      state.endDate = today();
    },
    setAssetsSummery(state, action) {
      state.summery = action.payload;
    },
    setAssetsType(state, action) {
      state.curType = action.payload;
    },
    setAssetsSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate) || {};
      if (startDate && action.payload !== "Custom") {
        state.startDate = formatDate(startDate);
      }
      if (endDate) {
        state.endDate = formatDate(endDate);
      }
    },
    setAssetsStartDate(state, action) {
      state.startDate = action.payload;
      state.selectedDate = "Custom";
    },
    setAssetsEndDate(state, action) {
      state.endDate = action.payload;
      state.selectedDate = "Custom";
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
  setResetAssetDate,
  setAssetsSummery,
} = assetsSlice.actions;
export default assetsSlice.reducer;
