"use client";

import { useSelector } from "react-redux";
import CapitalFooterbtns from "./CapitalFooterbtns";
import { setCapitalBtnDisable } from "@/lib/slices/capitalSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import Button from "@/app/_components/utils/Button";

function CapitalFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.capital);
  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <Button>Total</Button>
        </div>
        <div className="layout-footer-right">
          <PageNavigate
            currentPage={currentPage}
            setCurrentPage={setCapitalBtnDisable}
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

export default CapitalFooter;
