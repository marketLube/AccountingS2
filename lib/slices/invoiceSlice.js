import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
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
  },
});

export const { setInvoiceCurrentPage, setInvoiceBtnDisable } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
