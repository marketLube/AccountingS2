"use client";

import BranchwiseFooterbtns from "./BranchwiseFooterbtns";

function BranchwiseFooter() {
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <BranchwiseFooterbtns />
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

export default BranchwiseFooter;
