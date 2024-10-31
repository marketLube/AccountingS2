import React from "react";

function LayoutHead({ children }) {
  const [left, right] = React.Children.toArray(children);
  return (
    <div className="layout-head">
      <div className="layout-head-left">{left}</div>
      <div className="layout-head-right">{right}</div>
    </div>
  );
}

export default LayoutHead;
