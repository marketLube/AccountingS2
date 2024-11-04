"use client";
import { useSelector } from "react-redux";
import LiabilityFooterbtns from "./LiabilityFooterbtns";
import { setliabilityCurrentPage } from "@/lib/slices/liabilitySlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";

function LiabilityFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.liability);
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <LiabilityFooterbtns />
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setliabilityCurrentPage}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default LiabilityFooter;
