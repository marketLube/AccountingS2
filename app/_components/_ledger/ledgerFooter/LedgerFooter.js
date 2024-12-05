"use client";

import { useSelector } from "react-redux";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import { setLedgerBtnDisable } from "@/lib/slices/ledgerSlice";
import BottomCard from "../../_cards/_bottomCards/BottomCard";
import useLedgers from "@/app/_hooks/useLedgers";
import Button from "../../utils/Button";

function LedgerFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.ledger);

  const { totals } = useLedgers();

  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <Button>Debit: {totals?.totalDebit?.toFixed(2) || 0}</Button>
        <Button>Credit: {totals?.totalCredit?.toFixed(2) || 0}</Button>
        <Button>Receivable: {totals?.totalOutstanding?.toFixed(2) || 0}</Button>
        <Button>Liability: {totals?.totalLiability?.toFixed(2) || 0}</Button>
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
