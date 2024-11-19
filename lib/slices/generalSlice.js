// store/slices/exampleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axiosInstance";

export const fetchCategory = createAsyncThunk(
  "catagory/fetchCatagry?sort=-createdAt",
  async () => {
    const response = await apiClient.get("/catagory");
    return response?.data?.data;
  }
);
export const fetchBranches = createAsyncThunk(
  "branch/fetchBranches?sort=-createdAt",
  async () => {
    const response = await apiClient.get("/branch");
    return response?.data?.data;
  }
);
export const fetchBanks = createAsyncThunk("banks/fetchBanks", async () => {
  const response = await apiClient.get("/bank?sort=-createdAt");
  return response?.data?.data;
});

const initialState = {
  categories: [],
  categoryNames: [],
  particulars: [],

  branches: [],
  branchNames: [],
  banks: [],
  bankNames: [],

  totals: {},

  catLoading: false,
  catError: null,

  branchLoading: false,
  branchError: null,

  bankLoading: false,
  bankError: null,

  bankBalance: "",
  percentHike: "0",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTotals(state, action) {
      state.totals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //catagories
      .addCase(fetchCategory.pending, (state) => {
        state.catLoading = true;
        state.catError = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.catLoading = false;
        state.categories = action.payload;
        state.categoryNames = action.payload.map((cat) => cat.name);
        state.particulars = action.payload
          ?.map((cat) => cat.particulars)
          ?.flat();
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.catLoading = false;
        state.catError = action.error.message;
      })

      //branches
      .addCase(fetchBranches.pending, (state) => {
        state.branchLoading = true;
        state.branchError = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.branchLoading = false;
        state.branches = action.payload;
        state.branchNames = action?.payload?.map((val) => val?.name);
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.branchLoading = false;
        state.branchError = action.error.message;
      })

      //banks
      .addCase(fetchBanks.pending, (state) => {
        state.bankLoading = true;
        state.bankError = null;
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.bankLoading = false;
        state.banks = action.payload;
        state.bankNames = action.payload?.map((bank) => bank?.name);

        // Calculate the total bank balance
        state.bankBalance = action.payload?.reduce(
          (acc, bank) => acc + (bank?.balance || 0),
          0
        );

        // Calculate the total last month balance
        const lastMonthBal = action.payload?.reduce(
          (acc, bank) => acc + (bank?.lastMonthBalance || 0),
          0
        );
        state.percentHike = lastMonthBal
          ? ((state.bankBalance - lastMonthBal) / lastMonthBal) * 100
          : 0;
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.bankLoading = false;
        state.bankError = action.error.message;
      });
  },
});

export const { setTotals } = generalSlice.actions;

export default generalSlice.reducer;
