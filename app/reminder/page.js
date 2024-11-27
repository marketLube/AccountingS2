"use client";

import ReminderFooter from "../_components/reminder/ReminderFooter/ReminderFooter";
import Reminderhead from "../_components/reminder/ReminderHead/Reminderhead";
import ReminderTable from "../_components/reminder/ReminderTable/ReminderTable";
import { useAuthorize } from "../_hooks/useAuthorize";

function Page() {
  const isLoggedIn = useAuthorize();
  if (!isLoggedIn) return <div>Unauthorized</div>;

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
