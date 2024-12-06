function LedgerParticularItems({ item }) {
  if (!item) return null;
  return (
    <div className="table-col">
      <span className="table-check">
        <input type="checkbox" style={{ opacity: "0" }} />
      </span>
      <span className="table-col particular table-body-col">
        {item?.purpose}
      </span>
      <span className="table-col debit table-body-col">
        {item?.type === "Debit" ? item?.amount : "--"}
      </span>
      <span className="table-col credit table-body-col">
        {item?.type === "Credit" ? item?.amount : "--"}
      </span>
      <span className="table-col credit table-body-col">
        {item?.type === "Debit" ? item?.gstPercent : "--"}
      </span>
      <span className="table-col credit table-body-col">
        {" "}
        {item?.type === "Credit" ? item?.gstPercent : "--"}
      </span>
      <span className="table-col liability table-body-col">
        {" "}
        {item?.type === "liability" ? item?.amount : "--"}
      </span>
      <span className="table-col liability table-body-col">
        {" "}
        {item?.type === "outstanding" ? item?.amount : "--"}
      </span>
      <span className="table-col branch table-body-col">
        {" "}
        {item?.type === "Debit" || item?.tds === "Credit" ? item?.amount : "--"}
      </span>
      <span className="table-col branch table-body-col">
        {" "}
        {item?.type === "Debit" || item?.tds === "Credit" ? item?.amount : "--"}
      </span>
    </div>
  );
}

export default LedgerParticularItems;
