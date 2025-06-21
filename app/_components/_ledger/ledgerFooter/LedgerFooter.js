"use client";

import { useSelector } from "react-redux";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import { setLedgerCurrentPage } from "@/lib/slices/ledgerSlice";

import useLedgers from "@/app/_hooks/useLedgers";
import Button from "../../utils/Button";
import apiClient from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";

function LedgerFooter() {
  const { currentPage, btnDisable, curCat } = useSelector(
    (state) => state.ledger
  );

  const { totals } = useLedgers();

  const handleDownloadReport = async () => {
    try {
      // Build query parameters
      const params = new URLSearchParams();

      // Add category filter if selected
      if (curCat && !curCat.startsWith("All")) {
        params.append("catagory", curCat);
      }

      // Make API call to download Excel using the general endpoint
      const response = await apiClient.get(
        `/general/download?${params.toString()}`,
        {
          responseType: "blob",
        }
      );

      // Create blob and download
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ledger-report-${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Ledger report downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download ledger report. Please try again.");
    }
  };

  return (
    <div className={`layout-footer-bottom`}>
      <div className="layout-footer-bottom-left">
        <Button>Debit: {totals?.totalDebit?.toFixed(2) || 0}</Button>
        <Button>Credit: {totals?.totalCredit?.toFixed(2) || 0}</Button>
        <Button>Receivable: {totals?.totalOutstanding?.toFixed(2) || 0}</Button>
        <Button>Liability: {totals?.totalLiability?.toFixed(2) || 0}</Button>
      </div>
      <div className="layout-footer-right-custom">
        <Button onClick={handleDownloadReport}>Download Report</Button>
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setLedgerCurrentPage}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default LedgerFooter;
