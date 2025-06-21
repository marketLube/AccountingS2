"use client";

import { useSelector } from "react-redux";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import { setLedgerCurrentPage } from "@/lib/slices/ledgerSlice";

import useLedgers from "@/app/_hooks/useLedgers";
import Button from "../../utils/Button";
import apiClient from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";
import {
  useCategoryNameFinder,
  useBranchNameFinder,
} from "@/app/_services/finders";

function LedgerFooter() {
  const {
    currentPage,
    btnDisable,
    curCat,
    curBranch,
    startDate,
    endDate,
    clickedParticular,
  } = useSelector((state) => state.ledger);

  const { totals } = useLedgers();

  // Get the actual category and branch objects
  const category = useCategoryNameFinder(curCat);
  const branch = useBranchNameFinder(curBranch);

  const handleDownloadReport = async () => {
    try {
      // Build query parameters with all available filters
      const params = new URLSearchParams();

      // Add category filter if selected
      if (category?._id && !curCat.startsWith("All")) {
        params.append("catagory", category._id);
      }

      // Add branch filter if selected
      if (
        branch?._id &&
        !curBranch.startsWith("Select") &&
        !curBranch.startsWith("All")
      ) {
        params.append("branchId", branch._id);
      }

      // Add date filters if available
      if (startDate) {
        params.append("startDate", startDate);
      }
      if (endDate) {
        params.append("endDate", endDate);
      }

      // Add particular filter if a specific particular is selected
      if (clickedParticular?.particularId) {
        params.append("particular", clickedParticular.particularId);
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
