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

const initialState = {
  categories: [],
  particulars: [],

  branches: [],

  catLoading: false,
  catError: null,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchBranches.pending, (state) => {
        state.branchLoading = true;
        state.branchError = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.branchLoading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.branchLoading = false;
        state.branchError = action.error.message;
      });
  },
});

export default generalSlice.reducer;
