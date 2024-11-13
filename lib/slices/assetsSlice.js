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
  particulars: [],
  curBranch: "Select a Branch",
  curCat: "All Category",
  curParticular: "All Particular",
  curBank: "All Banks",
};

const assetsSlice = createSlice({
  name: "assets",

  initialState,
  reducers: {
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
} = assetsSlice.actions;
export default assetsSlice.reducer;
