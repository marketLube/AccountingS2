"use client";

import { useSelector } from "react-redux";
import LedgerFooterbtns from "./LedgerFooterbtns";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import { setLedgerBtnDisable } from "@/lib/slices/ledgerSlice";

function LedgerFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.ledger);
  return (
    <div className={`layout-footer`}>
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
