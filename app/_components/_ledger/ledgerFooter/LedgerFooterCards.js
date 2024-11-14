"use client";
import Arrow from "../../utils/Arrow";

function LedgerFooterCards() {
  return (
    <div className="ledgerfooterCard">
      <div className="ledgerfooteramount">₹ 77,776</div>
      <div className="ledgerfooteritems">
        <div className="ledgerfootertext">Expense</div>
        <Arrow color={"#0040ff"} size="small" />
      </div>
    </div>
  );
}

export default LedgerFooterCards;
