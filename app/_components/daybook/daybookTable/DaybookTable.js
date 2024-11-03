"use client";
import { useQuery } from "@tanstack/react-query";
import DaybookTableHead from "./DaybookTableHead";
import apiClient from "@/lib/axiosInstance";
import TableLoader from "../../_loader/TableLoader";
import DaybookTableItem from "./DaybookTableItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setBtnDisable } from "@/lib/slices/daybookSlice";

function DaybookTable() {
  const { startPage } = useSelector((state) => state.daybook);
  const {
    data: transactions,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => apiClient.get(`/transaction`).then((res) => res.data.data),
  });
  const dispatch = useDispatch();
  const veiwEight = transactions?.slice(startPage, startPage + 8);

  useEffect(() => {
    console.log(veiwEight?.length < 8, "l");
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