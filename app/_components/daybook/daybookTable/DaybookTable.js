"use client";
import DaybookTableHead from "./DaybookTableHead";
import TableLoader from "../../_loader/TableLoader";
import DaybookTableItem from "./DaybookTableItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setBtnDisable } from "@/lib/slices/daybookSlice";
import useTransactions from "@/app/_hooks/useTransactions";

function DaybookTable() {
  const { isLoading, isError, error, transactions } = useTransactions();

  const { startPage } = useSelector((state) => state.daybook);
  const dispatch = useDispatch();

  const veiwEight = transactions?.slice(startPage, startPage + 8);
  useEffect(() => {
    if (veiwEight?.length < 8) {
      dispatch(setBtnDisable(true));
    } else {
      dispatch(setBtnDisable(false));
    }
  }, [dispatch, veiwEight?.length]);

  return (
    <div className="table">
      <DaybookTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((trans, i) => (
          <DaybookTableItem key={i} transaction={trans} />
        ))
      )}
    </div>
  );
}

export default DaybookTable;
