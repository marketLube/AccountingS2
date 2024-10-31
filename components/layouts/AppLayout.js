"use client";

import Navigation from "./Navigation";
import { useState } from "react";

function AppLayout({ children }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="app"
      style={isHover ? { gridTemplateColumns: "13rem 1fr" } : {}}
    >
      <Navigation onSetHover={setIsHover} isHover={isHover} />
      <main className="main">{children}</main>
    </div>
  );
}

export default AppLayout;
