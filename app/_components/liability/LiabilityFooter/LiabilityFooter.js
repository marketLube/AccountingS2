"use client";
import { useSelector } from "react-redux";
import LiabilityFooterbtns from "./LiabilityFooterbtns";
import { setliabilityCurrentPage } from "@/lib/slices/liabilitySlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import Button from "@/app/_components/utils/Button";

function LiabilityFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.liability);
  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <Button>Total</Button>
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
