"use client";

import { useSelector } from "react-redux";
import { setBudgetplannerBtnDisable } from "@/lib/slices/budgetplannerSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import BudgetplannerFooterbtns from "./BudgetplannerFooterbtns";

function BudgetplannerFooter() {
  const { currentPage, btnDisable } = useSelector(
    (state) => state.budgetplanner
  );
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <BudgetplannerFooterbtns />
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setBudgetplannerBtnDisable}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default BudgetplannerFooter;
