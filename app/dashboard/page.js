"use client";
import { useSelector } from "react-redux";
import CurrentYearBox from "../_components/_cards/_yearly-card/CurrentYearBox";
import DashboardCurrentbalance from "../_components/_dashboard/DashboardCurrentbalance";
import Expense from "../_components/_dashboard/Expense";
import Income from "../_components/_dashboard/Income";
import Oustandingpay from "../_components/_dashboard/Oustandingpay";
import ReminderContainer from "../_components/_dashboard/ReminderContainer";
import { TopPerformer } from "../_components/_dashboard/TopPerformer";
import MonthlyPNLChart from "../_components/_cards/_monthlyCharts/MonthlyCart";

// export const metadata = {
//   title: "Dashboard",
// };
function Page() {
  const { branchNames } = useSelector((state) => state.general);

  const labels = [
    "Kochi",
    "Kozhikode",
    "Kannur",
    "Palakkad",
    "Kottayam",
    "Corporate",
    "Hilite",
  ];
  const datasets = [
    {
      label: "Expense",
      data: [
        100000, 130000, 160000, 140000, 180000, 220000, 210000, 200000, 230000,
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
    <div className={`layout dashboard`}>
      <div className={`dashboard-head`}>
        <h1 className={`main-head`}>Dashboard</h1>
      </div>
      <div className={`dashboard-left`}>
        <div className={`dashboard-stats`}>
          <div className={`stats-box dashboard-yearly-card`}>
            <CurrentYearBox />
          </div>
          <div className={`first-section`}>
            <Income />
          </div>

          <div className={`first-section`}>
            <Expense />
          </div>
          <div className={`stats-box`}>
            <TopPerformer />
          </div>
          <div className={`stats-box`}>
            <Oustandingpay />
          </div>
        </div>
        <div className={`stats-box dashboard-chart`}>
          <MonthlyPNLChart labels={labels} datasets={datasets} />
        </div>
      </div>
      <div className={`dashboard-right`}>
        <div className={`first-section dashboard-curbalance`}>
          <DashboardCurrentbalance />
        </div>
        <div className={`stats-box dashboard-reminder`}>
          <ReminderContainer />
        </div>
      </div>
    </div>
  );
}

export default Page;
