import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAllTime: true,
  dataset: {},
  credits: [],
  debits: [],
  branchNames: [],
  topPerformer: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,
  reducers: {
    setIsAllTime(state, action) {
      state.isAllTime = action.payload;
    },
    setDataset(state, action) {
      const branches = action.payload;
      state.credits = branches?.map((obj) => obj.totalCredit);
      state.debits = branches?.map((obj) => obj.totalExpense);
      state.branchNames = branches?.map((obj) => obj.name);
      state.topPerformer = branches?.reduce(
        (acc, obj) => {
          if (acc.profit < obj.profit) {
            acc.profit = obj.profit;
            acc.name = obj.name;
          }

          return acc;
        },
        { name: "", profit: 0 }
      );
    },
  },
});

export const { setIsAllTime, setDataset } = dashboardSlice.actions;
export default dashboardSlice.reducer;
