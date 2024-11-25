function BanktoTableHead() {
  return (
    <div className="table-head">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "0" }} />
      </span>
      <span className="table-col banktobank">Date</span>
      <span className="table-col banktobank table-col-head">From Bank</span>
      <span className="table-col banktobank table-col-head">From Branch</span>
      <span className="table-col banktobank table-col-head">To Bank</span>
      <span className="table-col banktobank table-col-head">To Branch</span>
      <span className="table-col banktobank table-col-head">Amount</span>
    </div>
  );
}

export default BanktoTableHead;
