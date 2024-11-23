"use client";
import { useSelector } from "react-redux";
import Arrow from "../utils/Arrow";

function DashboardCurrentbalance() {
  const { bankBalance, percentHike } = useSelector((state) => state.general);

  return (
    <div className="dashbordBalancecard">
      <div className="dashbordCurrentfirst">
        <div className="dashbordCurrenttext">Current Balance</div>
        <Arrow color={"#00ba9d"} size="large" />
      </div>
      <div
        className={`dashbordCurrentamount ${
          bankBalance < 0 ? "negativeamount" : ""
        }`}
      >
        ₹{bankBalance}
      </div>
      <div>
        <span>+{percentHike}%</span> than last month
      </div>
    </div>
  );
}

export default DashboardCurrentbalance;
