"use client";
import { useSelector } from "react-redux";
import Arrow from "../utils/Arrow";
import { formatWithCommas } from "@/app/_services/helpers";

function DashboardCurrentbalance({ transaction }) {
  const { percentHike, bankBalance: balance } = useSelector(
    (state) => state.general
  );

  const bankBalance = balance || 0;
  const isNegative = bankBalance < 0;
  const isPercentNeg = percentHike < 0;

  return (
    <div className="dashbordBalancecard">
      <div className="dashbordCurrentfirst">
        <div className="dashbordCurrenttext">Current Balance</div>
        <Arrow color={"#00ba9d"} size="large" />
      </div>
      <div className={`dashbordCurrentamount`}>
        {" "}
        {isNegative ? "-" : ""} ₹
        {formatWithCommas(Math.abs(bankBalance)?.toFixed(2))}
      </div>
      <div>
        <span style={isPercentNeg ? { color: "red" } : {}}>
          {isPercentNeg ? "-" : "+"}
          {percentHike}%
        </span>{" "}
        than last month
      </div>
    </div>
  );
}

export default DashboardCurrentbalance;
