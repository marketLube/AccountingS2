"use client";

import useReminders from "@/app/_hooks/useReminders";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setBudgetplannerBtnDisable } from "@/lib/slices/budgetplannerSlice";
import BudgetPlannerTableHead from "./BudegetplannerTableHead";
import BudgetplannerTableItems from "./BudgetplannerTableItems";

function BudgetplannerTable() {
  const { startPage } = useSelector((state) => state.budgetplanner);

  const { refetch, reminders, isError, isLoading, error } = useReminders();
  const veiwEight = useViewEight(
    reminders,
    startPage,
    setBudgetplannerBtnDisable
  );

  return (
    <div className="table">
      <BudgetPlannerTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((liab, i) => (
          <BudgetplannerTableItems
            key={i}
            item={liab}
          ></BudgetplannerTableItems>
        ))
      )}
    </div>
  );
}

export default BudgetplannerTable;
