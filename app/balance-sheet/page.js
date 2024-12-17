"use client";

import { useSelector } from "react-redux";
import TotalBalanceCard from "../_components/_cards/_balance-card/TotalBalanceCard";
import BottomCard from "../_components/_cards/_bottomCards/BottomCard";
import BalanceSheetTable from "../_components/balance-sheet/balancesheetTable/BalanceSheetTable";
import Button from "../_components/utils/Button";
import { useGstBalanceSheet } from "../_hooks/useBalanceSheet";
import { useAuthorize } from "../_hooks/useAuthorize";

function Page() {
  const { totals } = useSelector((state) => state.general);
  const { liabilityAndOutstanding } = totals || {};

  const isLoggedIn = useAuthorize();

  const { data, isError, isLoading } = useGstBalanceSheet();
  if (!isLoggedIn) return <div>Unauthorized</div>;

  return (
    <div className={`layout balance-sheet`}>
      <h1 className={`main-head`}>Summary</h1>
      <div className={`balance-sheet-body`}>
        <div className="balance-sheet-head">
          <Button type="thertiary">All Month</Button>
        </div>
        <BalanceSheetTable />
        <div className="balance-sheet-bank">
          <TotalBalanceCard />
        </div>
        <div className="balance-sheet-footer">
          <BottomCard
            value={liabilityAndOutstanding?.totalOutstanding?.toFixed(2)}
            type={"Receivable"}
            setIsDown={false}
          />
          <BottomCard
            value={liabilityAndOutstanding?.totalLiability?.toFixed(2)}
            type={"Liability"}
            setIsDown={true}
          />
          <BottomCard
            value={data?.totalIn?.toFixed(2)}
            type={"GST-IN"}
            setIsDown={true}
          />
          <BottomCard
            value={data?.totalOut?.toFixed(2)}
            type={"GST-OUT"}
            setIsDown={true}
          />
        </div>
      </div>
    </div>
  );
}
export default Page;
