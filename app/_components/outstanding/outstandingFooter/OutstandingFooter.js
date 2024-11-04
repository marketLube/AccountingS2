"use clients";
import OutstandingFooterBtns from "./OutstandingFooterBtns";

function OutstandingFooter() {
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <OutstandingFooterBtns />
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

export default OutstandingFooter;
