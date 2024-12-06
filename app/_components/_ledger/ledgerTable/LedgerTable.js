"use client";

import LedgerTableHead from "./LedgerTableHead";
import LedgerTableItems from "./LedgerTableItems";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setLedgerBtnDisable } from "@/lib/slices/ledgerSlice";
import useLedgers from "@/app/_hooks/useLedgers";

function LedgerTable() {
  const { startPage } = useSelector((state) => state.ledger);

  const { refetch, ledger, isError, isLoading, error } = useLedgers();
  const veiwEight = useViewEight(ledger, startPage, setLedgerBtnDisable);
  const { isSelected } = useSelector((state) => state.ledger);
  return (
    <div className="table">
      <LedgerTableHead />
      {isLoading || isError ? (
        <TableLoader />
      ) : isSelected ? (
        <div>Hello world</div>
      ) : (
        veiwEight?.map((liab, i) => (
          <LedgerTableItems key={i} item={liab}></LedgerTableItems>
        ))
      )}
    </div>
  );
}

export default LedgerTable;
