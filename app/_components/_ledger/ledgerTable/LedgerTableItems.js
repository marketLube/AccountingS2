"use client";

function LedgerTableItems({ item }) {
  return (
    <>
      <div className="table-col">
        <span className="table-check">
          <input type="checkbox" style={{ opacity: "0" }} />
        </span>
        <span className="table-col particular table-body-col">
          {item?.particularName}
        </span>
        <span className="table-col debit table-body-col">
          {item?.transactions?.totalDebit?.toFixed(2)}
        </span>
        <span className="table-col credit table-body-col">
          {item?.transactions?.totalCredit?.toFixed(2)}
        </span>
        <span className="table-col liability table-body-col">
          {item?.liabilityOutstanding?.totalLiability?.toFixed(2)}
        </span>
        <span className="table-col liability table-body-col">
          {item?.liabilityOutstanding?.totalOutstanding?.toFixed(2)}
        </span>
        <span className="table-col branch table-body-col">
          {item?.transactions?.tdsPayable?.toFixed(2)}
        </span>
        <span className="table-col branch table-body-col">
          {item?.transactions?.tdsReceivable?.toFixed(2)}
        </span>
      </div>
    </>
  );
}

export default LedgerTableItems;
