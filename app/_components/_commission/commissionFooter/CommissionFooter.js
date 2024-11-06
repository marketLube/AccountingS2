"use client";

import { useSelector } from "react-redux";
import { setCommisssionBtnDisable } from "@/lib/slices/CommissionSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import CommissionFooterbtns from "./CommissionFooterbtns";

function CommissionFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.commission);
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <CommissionFooterbtns />
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setCommisssionBtnDisable}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default CommissionFooter;
