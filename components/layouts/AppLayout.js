"use client";
import Navigation from "./Navigation";
import { useState } from "react";
import { Manrope } from "next/font/google";

const manropeFont = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800"],
  display: "swap",
});

function AppLayout({ children }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`app ${manropeFont.className}`}
      style={isHover ? { gridTemplateColumns: "13rem 1fr" } : {}}
    >
      <Navigation onSetHover={setIsHover} isHover={isHover} />
      <main className="main">{children}</main>
    </div>
  );
}

export default AppLayout;
