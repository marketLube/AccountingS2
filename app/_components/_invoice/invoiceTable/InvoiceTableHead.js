"use client";
function InvoiceTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "0" }} />
      </span>
      <span className="table-col invoiceId">Invoice No.</span>
      <span className="table-col billto particular">Bill to</span>
      <span className="table-col remark">Billed by</span>
      <span className="table-col particular">Revieved</span>
      <span className="table-col branch">Branch</span>
      <span className="table-col branch">Total</span>
    </div>
  );
}

export default InvoiceTableHead;
