"use client";

import { useSelector } from "react-redux";
import InvoiceFooter from "../_components/_invoice/invoiceFooter/InvoiceFooter";
import Invoicehead from "../_components/_invoice/invoiceHead/Invoicehead";
import InvoiceTable from "../_components/_invoice/invoiceTable/InvoiceTable";

function page() {
  const { isInVoice } = useSelector((state) => state.invoice);
  console.log(isInVoice, "is in voice");
  return (
    <div className={`layout assetes`}>
      <h1 className={`main-head`}>Invoice</h1>
      {isInVoice ? (
        <div className="invoice-container"></div>
      ) : (
        <div className={`layout-body`}>
          <Invoicehead />
          <InvoiceTable />
          <InvoiceFooter />
        </div>
      )}
    </div>
  );
}

export default page;
