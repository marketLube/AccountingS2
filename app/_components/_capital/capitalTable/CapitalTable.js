"use client";

import CapitalTableHead from "./CapitalTableHead";
import CapitalTableItems from "./CapitalTableItems";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setCapitalBtnDisable } from "@/lib/slices/capitalSlice";
import useCapitals from "@/app/_hooks/useCapital";

function CapitalTable() {
  const { startPage } = useSelector((state) => state.capital);

  const { refetch, capital, isError, isLoading, error } = useCapitals();
  const veiwEight = useViewEight(capital, startPage, setCapitalBtnDisable);

  return (
    <div className="table">
      <CapitalTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : veiwEight?.length === 0 ? (
        <div className="no-datafound">No Data Found</div>
      ) : (
        veiwEight?.map((liab, i) => (
          <CapitalTableItems key={i} item={liab}></CapitalTableItems>
        ))
      )}
    </div>
  );
}

export default CapitalTable;
