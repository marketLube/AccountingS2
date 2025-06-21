"use client";

import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setLedgerCurCat } from "@/lib/slices/ledgerSlice";
import Selector from "../../utils/Selector";
import apiClient from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";
import {
  useCategoryNameFinder,
  useBranchNameFinder,
} from "@/app/_services/finders";

function LedgerHead() {
  const dispatch = useDispatch();
  const [isDownloading, setIsDownloading] = useState(false);

  const { curCat, curBranch, startDate, endDate, clickedParticular } =
    useSelector((state) => state.ledger);

  const { categoryNames } = useSelector((state) => state.general);

  // Get the actual category and branch objects
  const category = useCategoryNameFinder(curCat);
  const branch = useBranchNameFinder(curBranch);

  const handleCatChange = (e) => {
    dispatch(setLedgerCurCat(e.target.value));
  };

  const handleDownloadReport = async () => {
    if (isDownloading) return; // Prevent multiple downloads

    setIsDownloading(true);
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

      console.log("Download params:", params.toString()); // Debug log

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
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button type="secondary" style={{ opacity: "0" }}>
            Edit
          </Button>
        </>
        <>
          <Selector
            options={["All Categories", ...categoryNames]}
            callback={handleCatChange}
            curValue={curCat}
          />
          <Button onClick={handleDownloadReport} disabled={isDownloading}>
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
        </>
      </LayoutHead>
    </>
  );
}

export default LedgerHead;
