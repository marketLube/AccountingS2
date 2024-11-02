"use client";
import { useQuery } from "@tanstack/react-query";
import DaybookTableHead from "./DaybookTableHead";
import apiClient from "@/lib/axiosInstance";
import FullPageLoader from "../../_loader/FullPageLoader";
import TableLoader from "../../_loader/TableLoader";
import DaybookTableItem from "./DaybookTableItem";

function DaybookTable() {
  const {
    data: transactions,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => apiClient.get(`/transaction`).then((res) => res.data.data),
  });

  const viewSix = transactions?.slice(0, 6);

  return (
    <div className="table">
      <DaybookTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        viewSix?.map((trans, i) => (
          <DaybookTableItem key={i} transaction={trans} />
        ))
      )}
    </div>
  );
}

export default DaybookTable;
