import useOutstanding from "@/app/_hooks/useOutstanding";
import OutstandingTableHead from "./OutstandingTableHead";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import { setOutBtnDisable } from "@/lib/slices/outstandingSlice";
import OutstandingTableItems from "./OutstandingTableItems";

function OutstandingTable() {
  const { outstandings, isLoading, isError, error, refetch } = useOutstanding();
  const { startPage } = useSelector((state) => state.outstanding);
  const veiwEight = useViewEight(outstandings, startPage, setOutBtnDisable);
  console.log(veiwEight, "view eight");
  return (
    <div className="table">
      <OutstandingTableHead />
      {veiwEight?.map((out, i) => (
        <OutstandingTableItems key={i} item={out}></OutstandingTableItems>
      ))}
    </div>
  );
}

export default OutstandingTable;
