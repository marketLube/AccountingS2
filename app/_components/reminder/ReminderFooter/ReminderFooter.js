"use client";

import ReminderFooterbtns from "./ReminderFooterbtns";

function ReminderFooter() {
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <ReminderFooterbtns />
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

export default ReminderFooter;
