"use client";

import { GoHomeFill } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { SiBlockchaindotcom } from "react-icons/si";
import { GiShirtButton } from "react-icons/gi";
import { FaHandHoldingUsd } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { PiNotebookBold } from "react-icons/pi";
import { PiFilesDuotone } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";
import { BiSolidPlusSquare } from "react-icons/bi";
import { MdLocalPhone } from "react-icons/md";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { AiFillBell } from "react-icons/ai";
import { RiFolderSettingsFill } from "react-icons/ri";
import NavItem from "./NavItem";

const routes = [
  { path: "/dashboard", icon: GoHomeFill, name: "Dashboard" },
  { path: "/daybook", icon: MdDateRange, name: "Daybook" },
  { path: "/balance-sheet", icon: BiSolidBarChartAlt2, name: "Summary" },
  { path: "/liability", icon: MdLocalPhone, name: "Liability" },
  { path: "/outstanding", icon: SiBlockchaindotcom, name: "Receivables" },
  { path: "/reminder", icon: AiFillBell, name: "Reminder" },
  { path: "/branchwise", icon: GiShirtButton, name: "Branch Wise Pnl" },
  { path: "/assetes", icon: FaHandHoldingUsd, name: "Assets" },
  { path: "/capital", icon: IoWalletOutline, name: "Capital" },
  { path: "/ledger", icon: PiNotebookBold, name: "Ledger" },
  { path: "/budgetplanner", icon: BiSolidPlusSquare, name: "Budget Planner" },
  { path: "/invoice", icon: PiFilesDuotone, name: "Invoice" },
  { path: "/commission", icon: RiMoneyDollarBoxFill, name: "Commission" },
  { path: "/manage", icon: RiFolderSettingsFill, name: "Manage" },
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
