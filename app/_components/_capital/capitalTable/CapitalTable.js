"use client";

import useReminders from "@/app/_hooks/useReminders";
import CapitalTableHead from "./CapitalTableHead";
import CapitalTableItems from "./CapitalTableItems";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setCapitalBtnDisable } from "@/lib/slices/capitalSlice";

function CapitalTable() {
  const { startPage } = useSelector((state) => state.capital);

  const { refetch, reminders, isError, isLoading, error } = useReminders();
  const veiwEight = useViewEight(reminders, startPage, setCapitalBtnDisable);

  return (
    <div className="table">
      <CapitalTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((liab, i) => (
          <CapitalTableItems key={i} item={liab}></CapitalTableItems>
        ))
      )}
    </div>
  );
}

export default CapitalTable;
