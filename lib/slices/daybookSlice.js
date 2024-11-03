import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
};

const daybookSlice = createSlice({
  name: "daybook",

  initialState,
  reducers: {
    setBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setDaybookCurrentPage(state, action) {
      const newPage = action.payload;

      // Handling forward page navigation
      if (state.currentPage < newPage) {
        if ((newPage - 1) % 4 === 0) {
          state.page += 1;
          state.temp = 1;
        } else {
          state.temp = ((newPage - 1) % 4) + 1;
        }
      }

      // Handling backward page navigation
      if (state.currentPage > newPage) {
        if (newPage % 4 === 0) {
          state.page -= 1;
          state.temp = 4;
        } else {
          state.temp = newPage % 4;
        }
      }

      // Update currentPage and calculate startPage
      state.currentPage = newPage;
      state.startPage = 8 * (state.temp - 1);
    },
  },
});

export const { setDaybookCurrentPage, setBtnDisable } = daybookSlice.actions;
export default daybookSlice.reducer;
