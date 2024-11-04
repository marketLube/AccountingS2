function OutstandingTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "1" }} />
      </span>
      <span className="table-col particular">Particular</span>
      <span className="table-col date">Date</span>
      <span className="table-col amount">Amount</span>
      <span className="table-col remark">Remark</span>
      <span className="table-col branch">Branch</span>
      <span className="table-col branch">Status</span>
    </div>
  );
}

export default OutstandingTableHead;
