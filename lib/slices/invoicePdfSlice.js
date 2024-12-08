import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logo: null,
  header: "TAX INVOICE",
  yourCompany: "",
  yourName: "",
  companyGstin: "",
  companyAddress: "",
  city: "",
  companySelectedCountry: "",
  companySelectedState: "",
  billTo: "",
  clientCompany: "",
  clientGstin: "",
  clientAddress: "",
  clientCity: "",
  clientState: "",
  clientCountry: "India",
  invoice: "#Invoice",
  date: "Invoice Date",
  dueDate: "Due Date",
  notes: "Notes",
  terms: "Terms and conditions",
  businessText: "It was great doing business with you",
  paymentText: "Please make the payment by the due date",
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoiceData: (state, action) => {
      Object.assign(state, action.payload); // Merge the payload into the state
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value; // Update a specific field dynamically
    },
    resetInvoice: () => initialState, // Reset to initial state
  },
});

export const { setInvoiceData, updateField, resetInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
