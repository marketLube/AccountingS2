"use client";

import InvoiceCompanyDetails from "./InvoiceCompanyDetails";
import InvoiceDateSection from "./InvoiceDateSection";
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
            <div className="invoice-form-to-container">
              <InvoiceTo />
              <InvoiceDateSection />
            </div>
            <InvoiceFromTable />
            <InvoiceFormFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDownloader;
