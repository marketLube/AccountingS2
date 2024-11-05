"use client";
import { useSelector } from "react-redux";
import LiabilityTableHead from "./LiabilityTableHead";
import { useLiability } from "@/app/_hooks/useLiability";
import { setLiabBtnDisable } from "@/lib/slices/liabilitySlice";
import OutstandingTableItems from "../../outstanding/outstandingTable/OutstandingTableItems";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";

function LiabilityTable() {
  const { startPage } = useSelector((state) => state.liability);

  const { refetch, liabilities, isError, isLoading, error } = useLiability();
  const veiwEight = useViewEight(liabilities, startPage, setLiabBtnDisable);

  return (
    <div className="table">
      <LiabilityTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((liab, i) => (
          <OutstandingTableItems key={i} item={liab}></OutstandingTableItems>
        ))
      )}
    </div>
  );
}

export default LiabilityTable;
