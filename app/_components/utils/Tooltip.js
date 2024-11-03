"use client";
import React, { useState, useEffect } from "react";

function Tooltip({
  type = "particular",
  parName,
  catName,
  remark,
  purpose,
  isVisible,
}) {
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTooltipPosition({
        left: e.clientX + 10,
        top: e.clientY + 10,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (type === "remark")
    return (
      <span
        className="tooltip"
        style={{
          left: `${tooltipPosition.left}px`,
          top: `${tooltipPosition.top}px`,
          position: "fixed",
          opacity: isVisible ? "1" : "0",
        }}
      >
        <span>{remark}</span>
      </span>
    );

  return (
    <span
      className="tooltip"
      style={{
        left: `${tooltipPosition.left}px`,
        top: `${tooltipPosition.top}px`,
        position: "fixed",
        opacity: isVisible ? "1" : "0",
      }}
    >
      <span>Particular: {parName}</span>
      <span>Category: {catName}</span>
      <span>Purpose: {purpose}</span>
    </span>
  );
}

export default Tooltip;
