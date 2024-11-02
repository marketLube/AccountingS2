"use client";
function DaybookTableItem({ transaction }) {
  return (
    <div className="table-col">
      <span className="table-check">
        <input type="checkbox" />
      </span>
      <span className="table-col particular table-body-col">Particular</span>
      <span className="table-col date table-body-col">Date</span>
      <span className="table-col amount table-body-col">Amount</span>
      <span className="table-col remark table-body-col">Remark</span>
      <span className="table-col branch table-body-col">Branch</span>
      <span className="table-col debit table-body-col">Debit</span>
      <span className="table-col credit table-body-col">Credit</span>
      <span className="table-col gst table-body-col">GST</span>
      <span className="table-col tds table-body-col">TDS</span>
    </div>
  );
}

export default DaybookTableItem;
