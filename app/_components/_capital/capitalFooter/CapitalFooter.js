"use client";

import { useSelector } from "react-redux";
import CapitalFooterbtns from "./CapitalFooterbtns";
import { setCapitalBtnDisable } from "@/lib/slices/capitalSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";

function CapitalFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.capital);
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <CapitalFooterbtns />
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setCapitalBtnDisable}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default CapitalFooter;
