import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAllTime: false,
  totalCredit: 0,
  totalDebit: 0,
  totalOutstanding: 0,
  totalLiability: 0,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,
  reducers: {
    setIsAllTime(state, action) {
      state.isAllTime = action.payload;
    },
  },
});

export const { setIsAllTime } = dashboardSlice.actions;
export default dashboardSlice.reducer;
