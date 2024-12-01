"use client";

import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setInvoiceBtnDisable } from "@/lib/slices/invoiceSlice";

import InvoiceTableItems from "./InvoiceTableItems";
import useInvoice from "@/app/_hooks/useInvoice";
import InvoiceTableHead from "./InvoiceTableHead";

function InvoiceTable() {
  const { startPage } = useSelector((state) => state.invoice);
  const { invoice, isError, isLoading } = useInvoice();

  const veiwEight = useViewEight(invoice, startPage, setInvoiceBtnDisable);

  return (
    <div className="table">
      <InvoiceTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((liab, i) => <InvoiceTableItems key={i} item={liab} />)
      )}
    </div>
  );
}

export default InvoiceTable;
