import { useQuery } from "@tanstack/react-query";
import TableLoader from "../../_loader/TableLoader";
import BalanceSheetTableHead from "../balancesheetTableHead/BalanceSheetTableHead";
import apiClient from "@/lib/axiosInstance";
import BalanceSheetTableItems from "./BalanceSheetTableItems";

function BalanceSheetTable() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["balancesheet"],
    queryFn: () =>
      apiClient
        .get("/stats/balance-sheet")
        .then((res) => res.data.formattedResult),
  });

  return (
    <div className="table">
      <BalanceSheetTableHead />
      {isLoading ? (
        <TableLoader className="sheet-loader" />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." className="sheet-loader" />
      ) : (
        data?.map((item, i) => <BalanceSheetTableItems key={i} item={item} />)
      )}
    </div>
  );
}

export default BalanceSheetTable;
