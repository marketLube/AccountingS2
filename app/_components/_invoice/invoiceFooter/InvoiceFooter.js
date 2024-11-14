"use client";

import { useSelector } from "react-redux";
import { setInvoiceBtnDisable } from "@/lib/slices/invoiceSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import InvoiceFooterbtns from "./InvoiceFooterbtns";
import Button from "@/app/_components/utils/Button";

function InvoiceFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.invoice);
  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <Button>Total</Button>
        </div>
        <div className="layout-footer-right">
          <PageNavigate
            currentPage={currentPage}
            setCurrentPage={setInvoiceBtnDisable}
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

export default InvoiceFooter;
