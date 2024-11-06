"use client";

import useReminders from "@/app/_hooks/useReminders";
import CapitalTableHead from "../../_commission/commissionTable/CommissionTableHead";
import CapitalTableItems from "./InvoiceTableItems";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setInvoiceBtnDisable } from "@/lib/slices/invoiceSlice";
import InvoiceTableHead from "../../_commission/commissionTable/CommissionTableHead";
import InvoiceTableItems from "./InvoiceTableItems";

function InvoiceTable() {
  const { startPage } = useSelector((state) => state.invoice);

  const { refetch, reminders, isError, isLoading, error } = useReminders();
  const veiwEight = useViewEight(reminders, startPage, setInvoiceBtnDisable);

  return (
    <div className="table">
      <InvoiceTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((liab, i) => (
          <InvoiceTableItems key={i} item={liab}></InvoiceTableItems>
        ))
      )}
    </div>
  );
}

export default InvoiceTable;
