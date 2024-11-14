import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";

const initialState = {
  page: 1,
  currentPage: 1,
  startPage: 0,
  temp: 1,
  btnDisable: false,
  isNewEntry: false,
  selectedItems: {},
  isEdit: false,
  particulars: [],
  curBranch: "Select a Branch",
  curCat: "All Category",
  curParticular: "All Particular",
  curBank: "All Banks",
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
    setInvoiceSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
    setInvoiceIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setInvoiceCurBranch(state, action) {
      state.curBranch = action.payload;
    },
    setInvoiceCurCat(state, action) {
      state.curCat = action.payload;
    },
    setInvoiceCurParticular(state, action) {
      state.curParticular = action.payload;
    },
    setInvoiceParticular(state, action) {
      state.particulars = action.payload;
    },
    setInvoiceCurBank(state, action) {
      state.curBank = action.payload;
    },
  },
});

export const {
  setInvoiceCurrentPage,
  setInvoiceBtnDisable,
  setIsInvoiceNewEntry,
  setInvoiceSelectedItems,
  setInvoiceIsEdit,
  setInvoiceCurBranch,
  setInvoiceCurCat,
  setInvoiceCurParticular,
  setInvoiceParticular,
  setInvoiceCurBank,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
