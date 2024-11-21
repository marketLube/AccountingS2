"use client";

import { useSelector } from "react-redux";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import { setLedgerBtnDisable } from "@/lib/slices/ledgerSlice";
import BottomCard from "../../_cards/_bottomCards/BottomCard";

function LedgerFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.ledger);

  const { totals } = useSelector((state) => state.general);
  const { liabilityAndOutstanding, transactions } = totals || {};
  console.log(transactions, "trans");
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <BottomCard type="Credit" value={transactions?.totalCredit} />
        <BottomCard
          type="Debit"
          value={transactions?.totalDebit}
          setIsDown={true}
        />
        <BottomCard
          type="Outstanding"
          value={liabilityAndOutstanding?.totalOutstanding}
        />
        <BottomCard
          type="Liability"
          value={liabilityAndOutstanding?.totalLiability}
          setIsDown={true}
        />
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setLedgerBtnDisable}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default LedgerFooter;
