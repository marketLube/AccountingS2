"use client";

function DaybookTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "0" }} />
      </span>
      <span className="table-col particular">Particular</span>
      <span className="table-col date table-col-head">Date</span>
      <span className="table-col amount table-col-head">Amount</span>
      <span className="table-col remark table-col-head">Remark</span>
      <span className="table-col branch table-col-head">Branch</span>
      <span className="table-col bank table-col-head">Bank</span>
      <span className="table-col debit table-col-head">Debit</span>
      <span className="table-col credit table-col-head">Credit</span>
      <span className="table-col gst table-col-head">GST</span>
      <span className="table-col tds table-col-head">TDS</span>
    </div>
  );
}

export default DaybookTableHead;
