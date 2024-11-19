"use clients";
import { useSelector } from "react-redux";
import OutstandingFooterBtns from "./OutstandingFooterBtns";
import { setOutstandingCurrentPage } from "@/lib/slices/outstandingSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import Button from "@/app/_components/utils/Button";

function OutstandingFooter() {
  const { currentPage, btnDisable, summery } = useSelector(
    (state) => state.outstanding
  );
  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <Button>Total : {summery?.totalAmount}</Button>
        </div>
        <div className="layout-footer-right">
          <PageNavigate
            currentPage={currentPage}
            setCurrentPage={setOutstandingCurrentPage}
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

export default OutstandingFooter;
