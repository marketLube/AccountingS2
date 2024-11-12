"use client";
import Button from "@/app/_components/utils/Button";
import DaybookFooterBtns from "./DaybookFooterBtns";
import { useSelector } from "react-redux";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import { setDaybookCurrentPage } from "@/lib/slices/daybookSlice";

function DaybookFooter() {
  const { currentPage, btnDisable, summery } = useSelector(
    (state) => state.daybook
  );
  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <DaybookFooterBtns />
        </div>
        <div className="layout-footer-right">
          <PageNavigate
            currentPage={currentPage}
            setCurrentPage={setDaybookCurrentPage}
            btnDisable={btnDisable}
          />
        </div>
      </div>
      <div className="layout-footer-bottom">
        <div className="layout-footer-bottom-left">
          <Button>Total Credit : {summery?.totalCredit}</Button>
          <Button>Total Debit : {summery?.totalDebit}</Button>
        </div>
        <Button>Download Report</Button>
      </div>
    </>
  );
}

export default DaybookFooter;
