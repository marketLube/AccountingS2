"use client";
function InvoiceTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "1" }} />
      </span>
      <span className="table-col particular">Invoice No.</span>
      <span className="table-col date">Bill to</span>
      <span className="table-col amount">Description</span>
      <span className="table-col remark">Billed by</span>
      <span className="table-col branch">Quantity</span>
      <span className="table-col branch">Unit price</span>
      <span className="table-col branch">Total</span>
    </div>
  );
}

export default InvoiceTableHead;
