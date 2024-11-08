"use client";
import { PiAlarmFill } from "react-icons/pi";
function DashboardReminderItems({ item }) {
  return (
    <div className="payment-item">
      <div className="payment-item-detail">
        <div className="clock">
          <PiAlarmFill className="clockset" />
        </div>
        <div>
          <div className="amount">₹{item.amount}</div>
          <div className="descripton">{item.description}</div>
        </div>
      </div>
      <div className="payment-date">{item.date}</div>
    </div>
  );
}

export default DashboardReminderItems;
