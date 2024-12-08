import { formatWithCommas } from "@/app/_services/helpers";
import React from "react";
import { useSelector } from "react-redux";

export const TopPerformer = () => {
  const { topPerformer } = useSelector((state) => state.dashboard);
  const isNegative = topPerformer?.profit < 0;
  return (
    <div className="topperformercard">
      <div className="topperformerhead">Top performer</div>
      <div className="topperformerdistrict">
        {topPerformer?.name || "No Performer"}
      </div>
      <div className="topperformerprofit">
        <span style={isNegative ? { color: "red" } : {}}>
          {isNegative ? "-" : ""}₹{" "}
          {formatWithCommas(topPerformer?.profit?.toFixed(2))}
        </span>{" "}
        Profit
      </div>
    </div>
  );
};
