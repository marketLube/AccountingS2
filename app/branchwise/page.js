"use client";
import { useSelector } from "react-redux";
import TotalBalanceCard from "../_components/_cards/_balance-card/TotalBalanceCard";
import MonthlyPNLChart from "../_components/_cards/_monthlyCharts/MonthlyCart";
import BranchWIseChartBox from "../_components/branchwisepnl/BranchWiseChartBox/BranchWIseChartBox";
import BranchwiseFooter from "../_components/branchwisepnl/BranchwiseFooter/BranchwiseFooter";
import Brachwisehead from "../_components/branchwisepnl/branchwisehead/Brachwisehead";
import BranchwiseTable from "../_components/branchwisepnl/BranchwiseTable/BranchwiseTable";
import { useBranchIdFinder } from "../_services/finders";
import { useBranchWiseChart } from "../_hooks/useBranchwise";
import BranchBalanceCard from "../_components/_cards/_balance-card/BranchBalanceCard";
import { useAuthorize } from "../_hooks/useAuthorize";

function Page() {
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

  const { data, isLoading, isError } = useBranchWiseChart();
  const { curBranch } = useSelector((state) => state.branchwise);
  const branch = useBranchIdFinder(curBranch);

  const totalIncome = data?.map((val) => val.totalIncome);
  const totalExpence = data?.map((val) => val.totalExpense);

  const isLoggedIn = useAuthorize();
  if (!isLoggedIn) return <div>Unauthorized</div>;

  // Reordered datasets to show Expense first, then Income
  const datasets = [
    {
      label: "Expense",
      data: totalExpence,
      gradientStart: "rgb(28, 101, 126)",
      gradientEnd: "#0c2d48",
    },
    {
      label: "Income",
      data: totalIncome,
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
            <BranchBalanceCard branch={branch} />
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

export default Page;
