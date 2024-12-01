"use client";

import { useSelector } from "react-redux";
import CurrentYearBox from "../../_cards/_yearly-card/CurrentYearBox";
import Button from "../../utils/Button";
import { useBranchWiseCircle } from "@/app/_hooks/useBranchwise";

function BranchWIseChartBox() {
  const { curBranch } = useSelector((state) => state.branchwise);
  const currentYear = new Date().getFullYear();
  const { stats, isError, isLoading } = useBranchWiseCircle();

  if (isLoading) {
    return <div className="branchwise-chart">Loading...</div>;
  }

  if (isError || !stats?.length) {
    return (
      <div className="branchwise-chart">
        <h4 className="text-small-bold">Yearly PNL of {curBranch}</h4>
        <p className="small-text">Failed to load data</p>
      </div>
    );
  }
  const sortedStats = [...stats].sort((a, b) => b.year - a.year);
  return (
    <div className="branchwise-chart">
      <div className="branchwise-chart-details">
        <h4 className="text-small-bold">Yearly Pnl of {curBranch}</h4>
        <span className="small-text">Overview of past Years</span>
        <Button>Download Report</Button>
      </div>
      <div className="branchwise-chart-current-year">
        <CurrentYearBox
          label={`Profit in ${currentYear}`}
          totals={{
            totalCredit: sortedStats[0]?.income || 0,
            totalDebit: sortedStats[0]?.expense || 0,
            profit: sortedStats[0]?.profit || 0,
          }}
        />
      </div>
      <div className="branchwise-chart-past-years">
        <CurrentYearBox
          label={`Profit in ${currentYear - 1}`}
          totals={{
            totalCredit: sortedStats[1]?.income || 0,
            totalDebit: sortedStats[1]?.expense || 0,
            profit: sortedStats[1]?.profit || 0,
          }}
        />
      </div>
      <div className="branchwise-chart-past-years">
        <CurrentYearBox
          label={`Profit in ${currentYear - 2}`}
          totals={{
            totalCredit: sortedStats[2]?.income || 0,
            totalDebit: sortedStats[2]?.expense || 0,
            profit: sortedStats[2]?.profit || 0,
          }}
        />
      </div>
    </div>
  );
}

export default BranchWIseChartBox;
