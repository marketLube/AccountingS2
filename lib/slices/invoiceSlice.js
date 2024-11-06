import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  isNewEntry: false,
};

const invoiceSlice = createSlice({
  name: "invoice",

  initialState,
  reducers: {
    setInvoiceBtnDisable(state, action) {
      state.btnDisable = action.payload;
    },
    setInvoiceCurrentPage(state, action) {
      setCurrentPage(state, action);
    },
    setIsInvoiceNewEntry(state, action) {
      state.isNewEntry = action.payload;
    },
  },
});

export const {
  setInvoiceCurrentPage,
  setInvoiceBtnDisable,
  setIsInvoiceNewEntry,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
