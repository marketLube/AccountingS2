"use client";
import { useSelector } from "react-redux";
import AssetsFooterbtns from "./AssetsFooterbtns";
import { setAssetsBtnDisable } from "@/lib/slices/assetsSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";

function AssetsFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.assets);
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <AssetsFooterbtns />
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setAssetsBtnDisable}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default AssetsFooter;
