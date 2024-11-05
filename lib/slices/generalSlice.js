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

const initialState = {
  categories: [],
  particulars: [],

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
      });
  },
});

export default generalSlice.reducer;
