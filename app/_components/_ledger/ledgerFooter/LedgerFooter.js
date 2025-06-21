"use client";

import { useSelector } from "react-redux";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import { setLedgerCurrentPage } from "@/lib/slices/ledgerSlice";

import useLedgers from "@/app/_hooks/useLedgers";
import Button from "../../utils/Button";
import apiClient from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";
import {
  useCategoryNameFinder,
  useBranchNameFinder,
} from "@/app/_services/finders";

function LedgerFooter() {
  const {
    currentPage,
    btnDisable,
    curCat,
    curBranch,
    startDate,
    endDate,
    clickedParticular,
  } = useSelector((state) => state.ledger);

  const { totals } = useLedgers();

  // Get the actual category and branch objects
  const category = useCategoryNameFinder(curCat);
  const branch = useBranchNameFinder(curBranch);

  return (
    <div className={`layout-footer-bottom`}>
      <div className="layout-footer-bottom-left">
        <Button>Debit: {totals?.totalDebit?.toFixed(2) || 0}</Button>
        <Button>Credit: {totals?.totalCredit?.toFixed(2) || 0}</Button>
        <Button>Receivable: {totals?.totalOutstanding?.toFixed(2) || 0}</Button>
        <Button>Liability: {totals?.totalLiability?.toFixed(2) || 0}</Button>
      </div>
      <div className="layout-footer-right-custom">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setLedgerCurrentPage}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default LedgerFooter;
