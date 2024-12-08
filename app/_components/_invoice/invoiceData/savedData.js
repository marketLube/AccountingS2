import React, { useState } from "react";
import InvoicePage from "../invoicePage/InvoicePage.js";
import InvoicePdf from "../invoicePdf/InvoicePdf.js";

const SavedData = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleDataGeneration = (data) => {
    setInvoiceData(data);
  };
  return (
    <div>
      <InvoicePage onGenerateData={handleDataGeneration} />
      {invoiceData && <InvoicePdf data={invoiceData} />}
    </div>
  );
};

export default SavedData;
