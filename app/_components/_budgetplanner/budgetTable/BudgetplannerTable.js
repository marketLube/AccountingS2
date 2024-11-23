"use client";

import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setBudgetplannerBtnDisable } from "@/lib/slices/budgetplannerSlice";
import BudgetPlannerTableHead from "./BudegetplannerTableHead";
import BudgetplannerTableItems from "./BudgetplannerTableItems";
import useBudgetPlanner from "@/app/_hooks/useBudgetPlanner";

function BudgetplannerTable() {
  const { startPage } = useSelector((state) => state.budgetplanner);

  const { refetch, events, isError, isLoading, error } = useBudgetPlanner();
  const veiwEight = useViewEight(events, startPage, setBudgetplannerBtnDisable);

  return (
    <div className="table">
      <BudgetPlannerTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : veiwEight?.length === 0 ? (
        <div className="no-datafound">No Data Found</div>
      ) : (
        veiwEight?.map((event, i) => (
          <BudgetplannerTableItems
            key={i}
            item={event}
          ></BudgetplannerTableItems>
        ))
      )}
    </div>
  );
}

export default BudgetplannerTable;
