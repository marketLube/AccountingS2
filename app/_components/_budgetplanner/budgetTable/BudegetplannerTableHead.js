"use client";
function BudgetPlannerTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "1" }} />
      </span>
      <span className="table-col particular">Particular</span>
      <span className="table-col date">Date</span>
      <span className="table-col amount">Amount</span>
      <span className="table-col change">Change</span>
      <span className="table-col total">Total Amount</span>
      <span className="table-col branch">Branch</span>
    </div>
  );
}

export default BudgetPlannerTableHead;
