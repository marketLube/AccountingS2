import React from "react";
import { useSelector } from "react-redux";

export const TopPerformer = () => {
  const { topPerformer } = useSelector((state) => state.dashboard);
  return (
    <div className="topperformercard">
      <div className="topperformerhead">Top performer</div>
      <div className="topperformerdistrict">{topPerformer?.name}</div>
      <div className="topperformerprofit">
        <span>₹ {topPerformer?.profit}</span> Profit
      </div>
    </div>
  );
};
