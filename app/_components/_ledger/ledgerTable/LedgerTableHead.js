"use client";
function LedgerTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "1" }} />
      </span>
      <span className="table-col particular">Particular</span>
      <span className="table-col date">Date</span>
      <span className="table-col amount">Amount</span>
      <span className="table-col debit">Debited</span>
      <span className="table-col credit">Credited</span>
      <span className="table-col liability">Liabilty</span>
      <span className="table-col outstanding">Outstanding</span>
      <span className="table-col tds">Tds Paid</span>
      <span className="table-col tds">Tds Recieved</span>
    </div>
  );
}

export default LedgerTableHead;
