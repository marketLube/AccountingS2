"use client";

import { useSelector } from "react-redux";
import ReminderFooterbtns from "./ReminderFooterbtns";
import { setReminderCurentPage } from "@/lib/slices/reminderSlice";
import PageNavigate from "../../utils/_pagination/PageNavigate";

function ReminderFooter() {
  const { currentPage, btnDisable } = useSelector((state) => state.reminder);
  return (
    <div className={`layout-footer`}>
      <div className="layout-footer-left">
        <ReminderFooterbtns />
      </div>
      <div className="layout-footer-right">
        <PageNavigate
          currentPage={currentPage}
          setCurrentPage={setReminderCurentPage}
          btnDisable={btnDisable}
        />
      </div>
    </div>
  );
}

export default ReminderFooter;
