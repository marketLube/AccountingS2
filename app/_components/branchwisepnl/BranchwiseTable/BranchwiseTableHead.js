"use client";

function BranchwiseTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "0" }} />
      </span>
      <span className="table-col particular">Particular</span>
      <span className="table-col date">Date</span>
      <span className="table-col amount">Amount</span>
      <span className="table-col remark">Remark</span>
      <span className="table-col debit">Debited</span>
      <span className="table-col credit">Credited</span>
      <span className="table-col branch">Branch</span>
    </div>
  );
}

export default BranchwiseTableHead;
