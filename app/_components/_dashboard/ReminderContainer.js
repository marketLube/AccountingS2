"use client";
import { useDispatch, useSelector } from "react-redux";
import DashboardReminderItems from "./DashboardReminderItems";
import { setIsReminderNewEntry } from "@/lib/slices/reminderSlice";
import ReminderNewEntryForm from "../_Forms/_reminderForms/ReminderNewEntryForm";
import FsModal from "../utils/FsModal";
import { Skeleton } from "antd";
import useReminders from "@/app/_hooks/useReminders";
import SmallLoader from "../utils/SmallLoader";

const paymentitem = [
  { amount: "1000", description: "Marketing expense", date: "25/9/2022" },
  { amount: "1000", description: "Marketing expense", date: "25/9/2022" },
  { amount: "1000", description: "Marketing expense", date: "25/9/2022" },
  { amount: "1000", description: "Marketing expense", date: "25/9/2022" },
  { amount: "1000", description: "Marketing expense", date: "25/9/2022" },
];
function ReminderContainer({ isLoading }) {
  const { reminders } = useReminders();

  const dispatch = useDispatch();
  const { isNewEntry } = useSelector((state) => state.reminder);
  return (
    <>
      <div className="dashboard-reminder-container">
        <div className="head">
          <div>
            <div className="title">Payment Reminder</div>
            <div className="set-reminder">Set your new reminder</div>
          </div>
          <button
            className="plus-icon"
            onClick={() => dispatch(setIsReminderNewEntry(true))}
          >
            +
          </button>
        </div>
        {isLoading ? (
          <SmallLoader />
        ) : (
          reminders
            ?.slice(0, 5)
            .map((item, i) => <DashboardReminderItems key={i} item={item} />)
        )}
      </div>
      <FsModal isOpen={isNewEntry} setIsCancel={setIsReminderNewEntry}>
        <ReminderNewEntryForm />
      </FsModal>
    </>
  );
}

export default ReminderContainer;
