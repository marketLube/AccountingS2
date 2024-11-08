"use client";

import useReminders from "@/app/_hooks/useReminders";
import ReminderTableHead from "./ReminderTableHead";
import TableLoader from "../../_loader/TableLoader";
import OutstandingTableItems from "../../outstanding/outstandingTable/OutstandingTableItems";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import { setRemBtnDiable } from "@/lib/slices/reminderSlice";
import ReminderTableItems from "./ReminderTableItems";

function ReminderTable() {
  const { reminders, isLoading, isError, error, refetch } = useReminders();
  const { startPage } = useSelector((state) => state.reminder);
  const veiwEight = useViewEight(reminders, startPage, setRemBtnDiable);

  return (
    <div className="table">
      <ReminderTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((rem, i) => (
          <ReminderTableItems key={i} item={rem}></ReminderTableItems>
        ))
      )}
    </div>
  );
}

export default ReminderTable;
