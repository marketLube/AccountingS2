"use client";

import useReminders from "@/app/_hooks/useReminders";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setCommissionBtnDisable } from "@/lib/slices/CommissionSlice";
import CommissionTableHead from "./CommissionTableHead";
import CommissionTableItems from "./CommissionTableItems";
import useUniv from "@/app/_hooks/useUnic";

function CommissionTable() {
  const { startPage } = useSelector((state) => state.commission);

  const { refetch, data, isError, isLoading, error } = useUniv();
  const veiwEight = useViewEight(data, startPage, setCommissionBtnDisable, 5);

  return (
    <div className="table commition-table">
      <CommissionTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : veiwEight?.length === 0 ? (
        <div className="no-datafound">No Data Found</div>
      ) : (
        data?.map((liab, i) => (
          <CommissionTableItems key={i} item={liab}></CommissionTableItems>
        ))
      )}
    </div>
  );
}

export default CommissionTable;
