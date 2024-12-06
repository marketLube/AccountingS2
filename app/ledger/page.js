"use client";
import { useSelector } from "react-redux";
import LedgerFooter from "../_components/_ledger/ledgerFooter/LedgerFooter";
import LedgerHead from "../_components/_ledger/ledgerHead/LedgerHead";
import LedgerTable from "../_components/_ledger/ledgerTable/LedgerTable";
import { useAuthorize } from "../_hooks/useAuthorize";

function Page() {
  const isLoggedIn = useAuthorize();

  if (!isLoggedIn) return <div>Unauthorized</div>;
  return (
    <div className={`layout ledger`}>
      <h1 className={`main-head`}>Ledger</h1>
      <div className={`layout-body`}>
        <LedgerHead />
        <LedgerTable />
        <LedgerFooter />
      </div>
    </div>
  );
}

export default Page;
