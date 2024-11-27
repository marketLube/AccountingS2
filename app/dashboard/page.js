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
import ToggleSwitch from "../_components/utils/ToggleSwitch/ToggleSwitch";
import { getCurrentMonthName } from "../_services/helpers";
import useDashboardTotals, { useDashboardChart } from "../_hooks/useDashboard";
import { useRouter } from "next/navigation";
import Login from "../_components/LoginPage/Login";
import SmallLoader from "../_components/utils/SmallLoader";
import { useEffect } from "react";

function Page() {
  const { isAllTime, debits, credits, branchNames } = useSelector(
    (state) => state.dashboard
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoading, isError, totals } = useDashboardTotals();
  const { isLoading: chartLoading, isError: chartError } = useDashboardChart();

  const { liabilityAndOutstanding, transactions } = totals || {};
  const labels = branchNames || ["Loading..", "Loading.."];

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) return;
    router.push("/login");
  }, [router]);

  const datasets = [
    {
      label: "Expense",
      data: debits,
      gradientStart: "rgb(28, 101, 126)",
      gradientEnd: "#0c2d48",
    },
    {
      label: "Income",
      data: credits,
      gradientStart: "#2eb629",
      gradientEnd: "#1b5e20",
    },
  ];

  if (!isLoggedIn) return <Login />;

  return (
    <div className={`layout dashboard`}>
      <div className={`dashboard-head`}>
        <h1 className={`main-head`}>
          {isAllTime ? (
            <span>All Time</span>
          ) : (
            <span>{getCurrentMonthName()}</span>
          )}
          <ToggleSwitch />
        </h1>
      </div>
      <div className={`dashboard-left`}>
        <div className={`dashboard-stats`}>
          <div
            className="stats-box dashboard-yearly-card"
            style={{
              position: "relative",
              width: "100%",
              height: "auto",
            }}
          >
            {isLoading ? (
              <SmallLoader />
            ) : (
              <CurrentYearBox totals={totals?.transactions} />
            )}
          </div>

          <div
            className={`first-section`}
            style={{
              position: "relative",
              width: "100%", // This is the full width of the parent
              height: "auto", // Fixed height for the skeleton to work correctly
            }}
          >
            {isLoading ? (
              <SmallLoader />
            ) : (
              <Income
                income={transactions?.totalCredit}
                isError={isError}
                isLoading={isLoading}
              />
            )}
          </div>
          <div
            className={`first-section`}
            style={{
              position: "relative",
              width: "100%", // This is the full width of the parent
              height: "auto", // Fixed height for the skeleton to work correctly
            }}
          >
            {isLoading ? (
              <SmallLoader />
            ) : (
              <Expense
                expense={transactions?.totalDebit}
                isError={isError}
                isLoading={isLoading}
              />
            )}
          </div>

          <div
            className={`stats-box`}
            style={{
              position: "relative",
              width: "100%", // This is the full width of the parent
              height: "auto", // Fixed height for the skeleton to work correctly
            }}
          >
            {isLoading ? (
              <SmallLoader />
            ) : (
              <TopPerformer
                expense={transactions?.totalDebit}
                isError={isError}
                isLoading={isLoading}
              />
            )}
          </div>

          <div
            className={`stats-box`}
            style={{
              position: "relative",
              width: "100%", // This is the full width of the parent
              height: "auto", // Fixed height for the skeleton to work correctly
            }}
          >
            {isLoading ? (
              <SmallLoader />
            ) : (
              <Oustandingpay
                outstanding={liabilityAndOutstanding?.totalOutstanding}
                isLoading={isLoading}
                isError={isError}
              />
            )}
          </div>
        </div>
        <div
          className={`stats-box dashboard-chart`}
          style={{
            position: "relative",
            width: "100%", // This is the full width of the parent
            height: "auto", // Fixed height for the skeleton to work correctly
          }}
        >
          {isLoading ? (
            <SmallLoader />
          ) : (
            <MonthlyPNLChart labels={labels} datasets={datasets} />
          )}
        </div>
      </div>
      <div className={`dashboard-right`}>
        <div
          className={`first-section dashboard-curbalance`}
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
          }}
        >
          {isLoading ? (
            <SmallLoader />
          ) : (
            <DashboardCurrentbalance transaction={transactions} />
          )}
        </div>
        <div className={`stats-box dashboard-reminder`}>
          <ReminderContainer isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default Page;
