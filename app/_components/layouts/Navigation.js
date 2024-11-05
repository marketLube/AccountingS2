"use client";

import { GoHomeFill } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";
import NavItem from "./NavItem";

const routes = [
  { path: "/dashboard", icon: GoHomeFill, name: "Dashboard" },
  { path: "/daybook", icon: MdDateRange, name: "Daybook" },
  { path: "/balance-sheet", icon: BsBarChartFill, name: "Balance Sheet" },
  { path: "/liability", icon: SiBlockchaindotcom, name: "Liability" },
  { path: "/outstanding", icon: FaPhoneAlt, name: "Outstanding" },
  { path: "/reminder", icon: SiBlockchaindotcom, name: "Reminder" },
  { path: "/branchwise", icon: SiBlockchaindotcom, name: "Branch Wise Pnl" },
  { path: "/assets", icon: SiBlockchaindotcom, name: "Assets" },
  { path: "/capital", icon: SiBlockchaindotcom, name: "Capital" },
  { path: "/ledger", icon: SiBlockchaindotcom, name: "Ledger" },
  { path: "/planner", icon: SiBlockchaindotcom, name: "Budget Planner" },
  { path: "/invoice", icon: SiBlockchaindotcom, name: "Invoice" },
  { path: "/commition", icon: SiBlockchaindotcom, name: "Commition" },
];

function Navigation({ onSetHover, isHover }) {
  return (
    <nav
      className="nav"
      onMouseEnter={() => onSetHover(true)}
      onMouseLeave={() => onSetHover(false)}
    >
      <ul className="nav-ul">
        {routes.map((item) => (
          <NavItem item={item} key={item.path} isHover={isHover} />
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
