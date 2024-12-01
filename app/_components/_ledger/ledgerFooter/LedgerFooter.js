"use client";

import { useSelector } from "react-redux";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import { setLedgerBtnDisable } from "@/lib/slices/ledgerSlice";
import BottomCard from "../../_cards/_bottomCards/BottomCard";
import useLedgers from "@/app/_hooks/useLedgers";

function LedgerFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.ledger);

  const { totals } = useLedgers();

  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <BottomCard type="Debit" value={totals?.totalDebit} setIsDown={true} />
        <BottomCard type="Credit" value={totals?.totalCredit} />
        <BottomCard type="Outstanding" value={totals?.totalOutstanding} />
        <BottomCard
          type="Liability"
          value={totals?.totalLiability}
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
