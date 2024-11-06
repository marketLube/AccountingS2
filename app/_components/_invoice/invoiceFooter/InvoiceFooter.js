"use client";

import { useSelector } from "react-redux";
import { setInvoiceBtnDisable } from "@/lib/slices/invoiceSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import InvoiceFooterbtns from "./InvoiceFooterbtns";

function InvoiceFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.invoice);
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <InvoiceFooterbtns />
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setInvoiceBtnDisable}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default InvoiceFooter;
