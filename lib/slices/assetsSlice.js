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

const assetsSlice = createSlice({
  name: "assets",

  initialState,
  reducers: {
    setAssetsSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);

      console.log(state.endDate, "solve");
      console.log(state.startDate, "Solve");
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
    setAssetsCurCat(state, action) {
      state.curCat = action.payload;
    },
    setAssetsCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setAssetsParticular(state, action) {
      state.particulars = action.payload;
    },
    setAssetsCurBank(state, action) {
      state.curBank = action.payload;
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
  setAssetsCurCat,
  setAssetsCurParticular,
  setAssetsParticular,
  setAssetsCurBank,
  setAssetsSelectedDate,
  setAssetsStartDate,
  setAssetsEndDate,
} = assetsSlice.actions;
export default assetsSlice.reducer;
