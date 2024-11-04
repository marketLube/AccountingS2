"use client";

import ReminderFooter from "../_components/reminder/ReminderFooter/ReminderFooter";
import Reminderhead from "../_components/reminder/ReminderHead/Reminderhead";
import ReminderTable from "../_components/reminder/ReminderTable/ReminderTable";

function Page() {
  return (
    <div className={`layout outstanding`}>
      <h1 className={`main-head`}>Reminder</h1>
      <div className={`layout-body`}>
        <Reminderhead />
        <ReminderTable />
        <ReminderFooter />
      </div>
    </div>
  );
}

export default Page;
