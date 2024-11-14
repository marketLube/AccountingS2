import { createSlice } from "@reduxjs/toolkit";
import setCurrentPage from "../reduxHelpers";
import formatDate, { today } from "@/app/_services/helpers";
import { dateOptions } from "@/app/data/generalDatas";
import { dateFinder } from "@/app/_services/finders";

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
  startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  endDate: today(),
  selectedDate: "Reset",
  dateOptions,
};

const invoiceSlice = createSlice({
  name: "invoice",

  initialState,
  reducers: {
    setInvoiceSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.startDate = formatDate(startDate);
      state.endDate = formatDate(endDate);

      console.log(state.endDate, "solve");
      console.log(state.startDate, "Solve");
    },
    setInvoiceStartDate(state, action) {
      state.invoiceStartDate = action.payload;
      state.selectedDate = "Reset";
    },
    setInvoiceEndDate(state, action) {
      state.invoiceEndDate = action.payload;
      state.selectedDate = "Reset";
    },

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
  setInvoiceSelectedDate,
  setInvoiceStartDate,
  setInvoiceEndDate,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
