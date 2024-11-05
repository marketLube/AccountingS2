import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
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
  },
});

export const { setAssetsCurrentPage, setAssetsBtnDisable } =
  assetsSlice.actions;
export default assetsSlice.reducer;
