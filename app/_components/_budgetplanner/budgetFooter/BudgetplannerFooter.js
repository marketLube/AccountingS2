"use client";

import { useSelector } from "react-redux";
import { setBudgetplannerBtnDisable } from "@/lib/slices/budgetplannerSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";

import Button from "@/app/_components/utils/Button";
import { useEffect, useState } from "react";

function BudgetplannerFooter() {
  const { currentPage, btnDisable, summery, curRange } = useSelector(
    (state) => state.budgetplanner
  );

  const [total, setTotal] = useState(summery?.total || 0);

  useEffect(() => {
    if (curRange.startsWith("One")) {
      setTotal(summery?.total * 1);
    } else if (curRange.startsWith("Three")) {
      setTotal(summery?.total * 3);
    } else if (curRange.startsWith("Six")) {
      setTotal(summery?.total * 6);
    }
  }, [curRange, summery]);

  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <Button>Download Report</Button>
          <Button>Total : {total}</Button>
        </div>
        <div className="layout-footer-right">
          <PageNavigate
            currentPage={currentPage}
            setCurrentPage={setBudgetplannerBtnDisable}
            btnDisable={btnDisable}
          />
        </div>
      </div>
    </>
  );
}

export default BudgetplannerFooter;
