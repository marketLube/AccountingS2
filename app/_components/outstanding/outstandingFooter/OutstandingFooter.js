"use clients";
import { useSelector } from "react-redux";
import OutstandingFooterBtns from "./OutstandingFooterBtns";
import { setOutstandingCurrentPage } from "@/lib/slices/outstandingSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";

function OutstandingFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.outstanding);
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <OutstandingFooterBtns />
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setOutstandingCurrentPage}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default OutstandingFooter;
