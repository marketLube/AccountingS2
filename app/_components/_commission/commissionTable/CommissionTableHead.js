"use client";
function CommissionTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "0" }} />
      </span>
      <span className="table-col particulars">Students</span>
      <span className="table-col date"> Date</span>
      <span className="table-col branch">Branch</span>
      <span className="table-col course-fee">Course fee</span>
      <span className="table-col remark">Remark</span>
      <span className="table-col receivable">Receivable</span>
      <span className="table-col status">Status</span>
      <span className="table-col agent">Agent</span>
    </div>
  );
}

export default CommissionTableHead;
