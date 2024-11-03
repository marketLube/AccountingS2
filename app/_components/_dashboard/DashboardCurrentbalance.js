"use client";
import Arrow from "../utils/Arrow";

function DashboardCurrentbalance() {
  return (
    <div className="dashbordBalancecard">
      <div className="dashbordCurrentfirst">
        <div className="dashbordCurrenttext">Current Balance</div>
        <Arrow color={"#00ba9d"} size="large" />
      </div>
      <div className="dashbordCurrentamount">$ 12,33,87,775,89</div>
      <div>
        <span>+2.74%</span> than last month
      </div>
    </div>
  );
}

export default DashboardCurrentbalance;
