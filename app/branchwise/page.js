"use client";
import TotalBalanceCard from "../_components/_cards/_balance-card/TotalBalanceCard";
import MonthlyPNLChart from "../_components/_cards/_monthlyCharts/MonthlyCart";
import BranchWIseChartBox from "../_components/branchwisepnl/BranchWiseChartBox/BranchWIseChartBox";
import BranchwiseFooter from "../_components/branchwisepnl/BranchwiseFooter/BranchwiseFooter";
import Brachwisehead from "../_components/branchwisepnl/branchwisehead/Brachwisehead";
import BranchwiseTable from "../_components/branchwisepnl/BranchwiseTable/BranchwiseTable";

function page() {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Reordered datasets to show Expense first, then Income
  const datasets = [
    {
      label: "Expense",
      data: [
        130000, 130000, 160000, 140000, 180000, 220000, 210000, 200000, 230000,
        240000, 260000, 290000,
      ],
      gradientStart: "rgb(28, 101, 126)",
      gradientEnd: "#0c2d48",
    },
    {
      label: "Income",
      data: [
        150000, 180000, 220000, 200000, 250000, 300000, 280000, 270000, 290000,
        310000, 350000, 370000,
      ],
      gradientStart: "#2eb629",
      gradientEnd: "#1b5e20",
    },
  ];

  return (
    <>
      <div className={`layout branchwise`}>
        <h1 className={`main-head`}>Branch Wise PNL</h1>

        <div className={`layout-body`}>
          <Brachwisehead />
          <BranchwiseTable />
          <BranchwiseFooter />
        </div>
        <div className="branchwise-cards-container">
          <div className="branchwise-total-bal">
            <TotalBalanceCard />
          </div>
          <div className="branchwise-total-bal">
            <TotalBalanceCard />
          </div>
          <BranchWIseChartBox />
        </div>

        <div className="branchwise-monthly-chart">
          <MonthlyPNLChart labels={labels} datasets={datasets} />
        </div>
      </div>
    </>
  );
}

export default page;
