"use client";
import { useSelector } from "react-redux";
import Button from "../../utils/Button";

function ReminderFooterbtns() {
  const { summery } = useSelector((state) => state.reminder);
  console.log(summery, "reminder summery");
  return (
    <>
      <Button>Download Report</Button>
      <Button>Total : {summery?.totalExcludingPaid}</Button>
      <Button>Paid : {summery?.totalPaid}</Button>
    </>
  );
}

export default ReminderFooterbtns;
