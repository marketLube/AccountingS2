"use client";

import { useSelector } from "react-redux";
import {
  setBranchwiseBtnDisable,
  setBranchwiseCurrentPage,
} from "@/lib/slices/branchwiseSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import Button from "../../utils/Button";

function BranchwiseFooter() {
  const { currentPage, summery } = useSelector((state) => state.branchwise);

  console.log(summery, "summery");
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <Button>Download Report</Button>
        <Button>Total</Button>
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
