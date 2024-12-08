// store/store.js
import { configureStore } from "@reduxjs/toolkit";

// Example: import your reducers here
import generalSlice from "./slices/generalSlice";
import daybookSlice from "./slices/daybookSlice";
import outstandingSlice from "./slices/outstandingSlice";
import liabilitySlice from "./slices/liabilitySlice";
import reminderSlice from "./slices/reminderSlice";
import branchwiseSlice from "./slices/branchwiseSlice";
import assetsSlice from "./slices/assetsSlice";
import capitalSlice from "./slices/capitalSlice";
import ledgerSlice from "./slices/ledgerSlice";
import budgetplannerSlice from "./slices/budgetplannerSlice";
import commissionSlice from "./slices/CommissionSlice";
import dashboardSlice from "./slices/dashboardSlice";
import invoiceFormSlice from "./slices/invoiceForm";
import authSlice from "./slices/authSlice";
import invoiceSlice from './slices/invoiceSlice';
import invoiceReducer from './slices/invoicePdfSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    general: generalSlice,
    dashboard: dashboardSlice,
    daybook: daybookSlice,
    outstanding: outstandingSlice,
    liability: liabilitySlice,
    reminder: reminderSlice,
    branchwise: branchwiseSlice,
    assets: assetsSlice,
    capital: capitalSlice,
    ledger: ledgerSlice,
    budgetplanner: budgetplannerSlice,
    commission: commissionSlice,
    invoice: invoiceSlice,
    invoiceform: invoiceFormSlice,
    invoicepdf:invoiceReducer,
  },
});

export default store;
