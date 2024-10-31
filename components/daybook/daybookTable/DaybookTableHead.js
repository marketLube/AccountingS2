function DaybookTableHead() {
  return (
    <div className="table-head">
      <span className="table-col particular">Particular</span>
      <span className="table-col date">Date</span>
      <span className="table-col amount">Amount</span>
      <span className="table-col remark">Remark</span>
      <span className="table-col branch">Branch</span>
      <span className="table-col debit">Debit</span>
      <span className="table-col credit">Credit</span>
      <span className="table-col gst">GST</span>
      <span className="table-col tds">TDS</span>
    </div>
  );
}

export default DaybookTableHead;
