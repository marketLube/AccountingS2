import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  register: null,
  errors: null,
  isAddNewBtn: true,
  invoiceSubmit: null,
};

const invoiceFormSlice = createSlice({
  name: "invoiceForm",

  initialState,
  reducers: {
    setInvoiceRegister(state, action) {
      state.register = action.payload;
    },
    setInvoiceErrors(state, action) {
      state.errors = action.payload;
    },
    setInvoiceAddNewBtn(state, action) {
      state.isAddNewBtn = action.payload;
    },
    setInvoiceSubmit(state, action) {
      state.invoiceSubmit = action.payload;
    },
  },
});

export const {
  setInvoiceRegister,
  setInvoiceErrors,
  setInvoiceAddNewBtn,
  setInvoiceSubmit,
} = invoiceFormSlice.actions;
export default invoiceFormSlice.reducer;
