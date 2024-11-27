"use client";
function CapitalTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "0" }} />
      </span>
      <span className="table-col particular">Invested by</span>
      <span className="table-col date">Date</span>
      <span className="table-col amount">Amount</span>
      <span className="table-col remark">Remark</span>
      <span className="table-col branch">Branch</span>
      <span className="table-col type">Type</span>
    </div>
  );
}

export default CapitalTableHead;
