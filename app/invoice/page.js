"use client";

import { useSelector } from "react-redux";
import InvoiceFooter from "../_components/_invoice/invoiceFooter/InvoiceFooter";
import Invoicehead from "../_components/_invoice/invoiceHead/Invoicehead";
import InvoiceTable from "../_components/_invoice/invoiceTable/InvoiceTable";
import InvoiceDownloader from "./InvoiceDownloader";
import { useAuthorize } from "../_hooks/useAuthorize";

function Page() {
  const { isInVoice } = useSelector((state) => state.invoice);
  const isLoggedIn = useAuthorize();
  if (!isLoggedIn) return <div>Unauthorized</div>;

  return isInVoice ? (
    <InvoiceDownloader />
  ) : (
    <div className="layout invoice">
      <h1 className="main-head">Invoice</h1>
      <div className="layout-body">
        <Invoicehead />
        <InvoiceTable />
        <InvoiceFooter />
      </div>
    </div>
  );
}

export default Page;
