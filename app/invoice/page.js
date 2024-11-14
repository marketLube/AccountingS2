"use client";

import { useSelector } from "react-redux";
import InvoiceFooter from "../_components/_invoice/invoiceFooter/InvoiceFooter";
import Invoicehead from "../_components/_invoice/invoiceHead/Invoicehead";
import InvoiceTable from "../_components/_invoice/invoiceTable/InvoiceTable";
import InvoiceDownloader from "./InvoiceDownloader";

function Page() {
  const { isInVoice } = useSelector((state) => state.invoice);
  return isInVoice ? (
    <InvoiceDownloader />
  ) : (
    <div className="layout assetes">
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
