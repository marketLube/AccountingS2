// store/slices/exampleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axiosInstance";

export const fetchCategory = createAsyncThunk(
  "catagory/fetchCatagry",
  async () => {
    const response = await apiClient.get("/catagory");
    return response?.data?.data;
  }
);
export const fetchBranches = createAsyncThunk(
  "branch/fetchBranches",
  async () => {
    const response = await apiClient.get("/branch");
    return response?.data?.data;
  }
);
export const fetchBanks = createAsyncThunk("banks/fetchBanks", async () => {
  const response = await apiClient.get("/bank");
  return response?.data?.data;
});

const initialState = {
  categories: [],
  particulars: [],

  branches: [],
  branchNames: [],
  banks: [],
  bankNames: [],

  catLoading: false,
  catError: null,

  branchLoading: false,
  branchError: null,

  bankLoading: false,
  bankError: null,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
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
        state.bankNames = action?.payload?.map((bank) => bank?.name);
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.bankLoading = false;
        state.bankError = action.error.message;
      });
  },
});

export default generalSlice.reducer;
