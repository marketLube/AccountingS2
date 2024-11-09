"use client";
import CurrentYearBox from "../../_cards/_yearly-card/CurrentYearBox";
import Button from "../../utils/Button";

function BranchWIseChartBox() {
  return (
    <div className="branchwise-chart">
      <div className="branchwise-chart-details">
        <h4 className="text-small-bold">Yearly Pnl of Kochi</h4>
        <span className="small-text">Overview of past Years</span>
        <Button>Download Report</Button>
      </div>
      <div className="branchwise-chart-current-year">
        <CurrentYearBox />
      </div>
      <div className="branchwise-chart-past-years">
        <CurrentYearBox />
      </div>
      <div className="branchwise-chart-past-years">
        <CurrentYearBox />
      </div>
    </div>
  );
}

export default BranchWIseChartBox;
