"use client";

import useReminders from "@/app/_hooks/useReminders";
import LedgerTableHead from "./LedgerTableHead";
import LedgerTableItems from "./LedgerTableItems";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setLedgerBtnDisable } from "@/lib/slices/ledgerSlice";

function LedgerTable() {
  const { startPage } = useSelector((state) => state.ledger);

  const { refetch, reminders, isError, isLoading, error } = useReminders();
  const veiwEight = useViewEight(reminders, startPage, setLedgerBtnDisable);

  return (
    <div className="table">
      <LedgerTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((liab, i) => (
          <LedgerTableItems key={i} item={liab}></LedgerTableItems>
        ))
      )}
    </div>
  );
}

export default LedgerTable;
