"use client";
import LiabilityFooterbtns from "./LiabilityFooterbtns";

function LiabilityFooter() {
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <LiabilityFooterbtns />
      </div>
      <div className="layout-footer-right">
        {/* <PageNavigate
    currentPage={currentPage}
    setCurrentPage={setDaybookCurrentPage}
    btnDisable={btnDisable}
  /> */}
      </div>
    </div>
  );
}

export default LiabilityFooter;
