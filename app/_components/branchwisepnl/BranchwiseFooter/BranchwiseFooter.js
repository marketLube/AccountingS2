"use client";

import { useSelector } from "react-redux";
import BranchwiseFooterbtns from "./BranchwiseFooterbtns";
import {
  setBranchwiseBtnDisable,
  setBranchwiseCurrentPage,
} from "@/lib/slices/branchwiseSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";

function BranchwiseFooter() {
  const { currentPage } = useSelector((state) => state.branchwise);
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <BranchwiseFooterbtns />
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setBranchwiseCurrentPage}
          btnDisable={setBranchwiseBtnDisable}
        />
      </div>
    </div>
  );
}

export default BranchwiseFooter;
