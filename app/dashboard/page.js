import DashboardCurrentbalance from "../_components/_dashboard/DashboardCurrentbalance";
import Expense from "../_components/_dashboard/Expense";
import Income from "../_components/_dashboard/Income";
import Oustandingpay from "../_components/_dashboard/Oustandingpay";
import { TopPerformer } from "../_components/_dashboard/TopPerformer";

export const metadata = {
  title: "Dashboard",
};
function Page() {
  return (
    <div className={`layout dashboard`}>
      <div className={`dashboard-head`}>
        <h1 className={`main-head`}>Dashboard</h1>
      </div>
      <div className={`dashboard-left`}>
        <div className={`dashboard-stats`}>
          <div className={`stats-box`}></div>
          <div className={`stats-box`}>
            <Income />
          </div>
          <div className={`stats-box`}>
            <Expense />
          </div>
          <div className={`stats-box`}>
            <TopPerformer />
          </div>
          <div className={`stats-box`}>
            <Oustandingpay />
          </div>
        </div>
        <div className={`stats-box dashboard-chart`}></div>
      </div>
      <div className={`dashboard-right`}>
        <div className={`stats-box dashboard-curbalance`}>
          <DashboardCurrentbalance />
        </div>
        <div className={`stats-box dashboard-reminder`}></div>
      </div>
    </div>
  );
}

export default Page;
