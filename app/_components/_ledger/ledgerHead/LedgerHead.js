"use client";

import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import { setLedgerCurCat } from "@/lib/slices/ledgerSlice";
import Selector from "../../utils/Selector";

function LedgerHead() {
  const dispatch = useDispatch();
  const { curCat } = useSelector((state) => state.ledger);

  const { categoryNames } = useSelector((state) => state.general);

  const handleCatChange = (e) => {
    dispatch(setLedgerCurCat(e.target.value));
  };
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
          <Button onClick={handleDownloadReport}>Download Report</Button>
        </>
      </LayoutHead>
    </>
  );
}

export default LedgerHead;
