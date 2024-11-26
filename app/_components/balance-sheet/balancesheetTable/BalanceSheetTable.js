import TableLoader from "../../_loader/TableLoader";
import BalanceSheetTableHead from "../balancesheetTableHead/BalanceSheetTableHead";
import BalanceSheetTableItems from "./BalanceSheetTableItems";
import { useBalanceSheet } from "@/app/_hooks/useBalanceSheet";

function BalanceSheetTable() {
  const { data, isLoading, isError } = useBalanceSheet();
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
