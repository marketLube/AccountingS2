"use client";
import DashboardReminderItems from "./DashboardReminderItems";

const paymentitem = [
  { amount: "1000", description: "Marketing expense", date: "25/9/22" },
  { amount: "1000", description: "Marketing expense", date: "25/9/22" },
  { amount: "1000", description: "Marketing expense", date: "25/9/22" },
  { amount: "1000", description: "Marketing expense", date: "25/9/22" },
];
function ReminderContainer() {
  return (
    <div className="dashboard-reminder-container">
      <div className="head">
        <div>
          <div className="title">Payment Reminder</div>
          <div className="set-reminder">Set your new reminder</div>
        </div>
        <div className="plus-icon">+</div>
      </div>
      {paymentitem.map((item, i) => (
        <DashboardReminderItems key={i} item={item} />
      ))}
    </div>
  );
}

export default ReminderContainer;
