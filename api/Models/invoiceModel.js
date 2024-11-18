import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  itemDescription: {
    type: String,
    default: "Item Description",
  },
  quantity: {
    type: String,
    default: "Qty",
  },
  gst: {
    type: String,
    default: "",
  },
  rate: {
    type: String,
    default: "Rate",
  },
  sgst: {
    type: String,
    default: "SGST",
  },
  cgst: {
    type: String,
    default: "CGST",
  },
  amount: {
    type: String,
    default: "Amount",
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  companyName: {
    type: String,
    default: "Skymark",
  },
  companyName2: {
    type: String,
    default: "Bill To",
  },
  receiverName: {
    type: String,
    default: "",
  },
  accountNumber: {
    type: String,
    default: "",
  },
  ifsc: {
    type: String,
    default: "",
  },
  branch: {
    type: String,
    default: "",
  },
  invoiceId: {
    type: String,
    default: "",
  },
  invoiceDate: {
    type: Date,
    default: null,
  },
  invoiceDueDate: {
    type: Date,
    default: null,
  },
  billtoGst: {
    type: String,
    default: "",
  },
  name2: {
    type: String,
    default: "",
  },
  gst2: {
    type: String,
    default: "",
  },
  address2: {
    type: String,
    default: "",
  },
  city2: {
    type: String,
    default: "",
  },
  state2: {
    type: String,
    default: "",
  },
  country2: {
    type: String,
    default: "",
  },
  items: [
    {
      desc: String,
      qty: Number,
      rate: Number,
      sgst: String,
      cgst: String,
      amount: Number,
    },
  ],
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
