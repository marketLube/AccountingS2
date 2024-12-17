"use client";

import { useSelector } from "react-redux";
import { setCommissionCurrentPage } from "@/lib/slices/CommissionSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import Button from "@/app/_components/utils/Button";
function CommissionFooter() {
  const { currentPage, btnDisable, summery } = useSelector(
    (state) => state.commission
  );
  console.log(summery, "ooooooooooo");
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <Button>Download Report</Button>
        <Button>Total :{summery?.totalExcludingPending}</Button>
        <Button>Pending :{summery?.totalPending}</Button>
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setCommissionCurrentPage}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default CommissionFooter;
