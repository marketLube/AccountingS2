"use client";
import Button from "@/app/_components/utils/Button";
import DaybookFooterBtns from "./DaybookFooterBtns";
import { useSelector } from "react-redux";
import { useState } from "react";
import PageNavigate from "../../utils/_pagination/PageNavigate";
import { setDaybookCurrentPage } from "@/lib/slices/daybookSlice";
import apiClient from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";

function DaybookFooter() {
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    currentPage,
    btnDisable,
    summery,
    startDate,
    endDate,
    curBranch,
    curBank,
    curCat,
    curParticular,
    query,
    gstFilter,
  } = useSelector((state) => state.daybook);

  const handleExport = async () => {
    if (isDownloading) return; // Prevent multiple downloads

    setIsDownloading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        startDate: startDate,
        endDate: endDate,
      });

      // Add filters if they're not "All"
      if (curBranch && !curBranch.startsWith("All")) {
        params.append("branch", curBranch);
      }
      if (curBank && !curBank.startsWith("All")) {
        params.append("bank", curBank);
      }
      if (curCat && !curCat.startsWith("All")) {
        params.append("catagory", curCat);
      }
      if (curParticular && !curParticular.startsWith("All")) {
        params.append("particular", curParticular);
      }
      if (query) {
        params.append("search", query);
      }
      if (gstFilter && gstFilter !== "All Type") {
        params.append("gst", gstFilter);
      }

      // Make API call to download Excel
      const response = await apiClient.get(
        `/transaction/download-excel?${params.toString()}`,
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
      link.download = `transaction-report-${startDate}-to-${endDate}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Excel report downloaded successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to download Excel report. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className={`layout-footer`}>
        <div className="layout-footer-left">
          <DaybookFooterBtns />
        </div>
        <div className="layout-footer-right">
          <PageNavigate
            currentPage={currentPage}
            setCurrentPage={setDaybookCurrentPage}
            btnDisable={btnDisable}
          />
        </div>
      </div>
      <div className="layout-footer-bottom">
        <div className="layout-footer-bottom-left">
          <Button>Total Credit : {summery?.totalCredit?.toFixed(2)}</Button>
          <Button>Total Debit : {summery?.totalDebit?.toFixed(2)}</Button>
        </div>
        <Button onClick={handleExport} disabled={isDownloading}>
          {isDownloading ? (
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0110-10v4a6 6 0 00-6 6H2z"
                ></path>
              </svg>
              <span>Downloading...</span>
            </div>
          ) : (
            "Download Report"
          )}
        </Button>
      </div>
    </>
  );
}

export default DaybookFooter;
