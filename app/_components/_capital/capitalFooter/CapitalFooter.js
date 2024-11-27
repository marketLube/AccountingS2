"use client";

import { useSelector } from "react-redux";
import { setCapitalBtnDisable } from "@/lib/slices/capitalSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import Button from "@/app/_components/utils/Button";

function CapitalFooter() {
  const { currentPage, btnDisable, summery } = useSelector(
    (state) => state.capital
  );
  console.log(summery, "summery");
  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <Button>Download Report</Button>
          <Button>Total : {summery?.overallTotal}</Button>
          <Button>Fixed : {summery?.fixedTotal}</Button>
          <Button>Temp : {summery?.tempTotal}</Button>
        </div>
        <div className="layout-footer-right">
          <PageNavigate
            currentPage={currentPage}
            setCurrentPage={setCapitalBtnDisable}
            btnDisable={btnDisable}
          />
        </div>
      </div>
    </>
  );
}

export default CapitalFooter;
