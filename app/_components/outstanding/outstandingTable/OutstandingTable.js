import useOutstanding from "@/app/_hooks/useOutstanding";
import OutstandingTableHead from "./OutstandingTableHead";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import { setOutBtnDisable } from "@/lib/slices/outstandingSlice";
import OutstandingTableItems from "./OutstandingTableItems";
import TableLoader from "../../_loader/TableLoader";

function OutstandingTable() {
  const { outstandings, isLoading, isError, error, refetch } = useOutstanding();

  const { startPage } = useSelector((state) => state.outstanding);
  const veiwEight = useViewEight(outstandings, startPage, setOutBtnDisable);

  return (
    <div className="table">
      <OutstandingTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((liab, i) => (
          <OutstandingTableItems key={i} item={liab}></OutstandingTableItems>
        ))
      )}
    </div>
  );
}

export default OutstandingTable;
