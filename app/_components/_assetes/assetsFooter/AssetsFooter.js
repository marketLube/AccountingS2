"use client";
import { useSelector } from "react-redux";
import { setAssetsBtnDisable } from "@/lib/slices/assetsSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import Button from "@/app/_components/utils/Button";

function AssetsFooter() {
  const { currentPage, btnDisable, summery } = useSelector(
    (state) => state.assets
  );
  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <Button>Total : {summery?.overallTotal}</Button>
          <Button>Fixed : {summery?.fixedTotal}</Button>
          <Button>Temp : {summery?.tempTotal}</Button>
        </div>
        <div className="layout-footer-right">
          <PageNavigate
            currentPage={currentPage}
            setCurrentPage={setAssetsBtnDisable}
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

export default AssetsFooter;
