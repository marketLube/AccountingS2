"use client";
function CommissionTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "1" }} />
      </span>
      <span className="table-col particular"> Date</span>
      <span className="table-col date">Students</span>
      <span className="table-col amount">Branch</span>
      <span className="table-col remark">Course fee</span>
      <span className="table-col branch">Receivable</span>
      <span className="table-col branch">Status</span>
      <span className="table-col branch">Agent</span>
    </div>
  );
}

export default CommissionTableHead;
