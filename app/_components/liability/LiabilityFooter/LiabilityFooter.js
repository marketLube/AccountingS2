"use client";
import { useSelector } from "react-redux";
import { setliabilityCurrentPage } from "@/lib/slices/liabilitySlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import Button from "@/app/_components/utils/Button";

function LiabilityFooter() {
  const { currentPage, btnDisable, summery } = useSelector(
    (state) => state.liability
  );
  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <Button>Total : {summery?.totalExcludingPaid}</Button>
          <Button>Paid : {summery?.totalPaid}</Button>
        </div>
        <div className="layout-footer-right">
          <PageNavigate
            currentPage={currentPage}
            setCurrentPage={setliabilityCurrentPage}
            btnDisable={btnDisable}
          />
        </div>
      </div>
      <div className="layout-footer-bottom">
        <div className="layout-footer-bottom-left">
          <Button>Download Report</Button>
        </div>
      </div>
    </>
  );
}

export default LiabilityFooter;
