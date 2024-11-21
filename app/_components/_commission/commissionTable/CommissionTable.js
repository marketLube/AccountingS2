"use client";

import useReminders from "@/app/_hooks/useReminders";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setCommissionBtnDisable } from "@/lib/slices/CommissionSlice";
import CommissionTableHead from "./CommissionTableHead";
import CommissionTableItems from "./CommissionTableItems";

function CommissionTable() {
  const { startPage } = useSelector((state) => state.commission);

  const { refetch, reminders, isError, isLoading, error } = useReminders();
  const veiwEight = useViewEight(
    reminders,
    startPage,
    setCommissionBtnDisable,
    5
  );

  return (
    <div className="table commition-table">
      <CommissionTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((liab, i) => (
          <CommissionTableItems key={i} item={liab}></CommissionTableItems>
        ))
      )}
    </div>
  );
}

export default CommissionTable;
