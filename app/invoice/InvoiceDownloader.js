"use client";

import InvoiceCompanyDetails from "./InvoiceCompanyDetails";
import InvoiceFormFooter from "./InvoiceFormFooter";
import InvoiceFormHead from "./InvoiceFormHead";
import InvoiceFromTable from "./InvoiceTable/InvoiceFormTable";
import InvoiceTo from "./InvoiceTo";

function InvoiceDownloader() {
  return (
    <div className="invoice-container">
      <div className="invoice-body">
        <div className="invoice-form">
          <div className="invoice-form-content-box">
            <InvoiceFormHead />
            <InvoiceCompanyDetails />
            <InvoiceTo />
            <InvoiceFromTable />
            <InvoiceFormFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDownloader;
