"use client";

import BranchwiseTableHead from "./BranchwiseTableHead";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TableLoader from "../../_loader/TableLoader";
import { setBranchwiseBtnDisable } from "@/lib/slices/branchwiseSlice";
import BranchwiseTableItems from "./BranchwiseTableItems";
import useBranchWise from "@/app/_hooks/useBranchwise";

function BranchwiseTable() {
  const { isLoading, isError, error, branchwiseTrans } = useBranchWise();

  const { startPage } = useSelector((state) => state.daybook);
  const dispatch = useDispatch();

  const veiwEight = branchwiseTrans?.slice(startPage, startPage + 8);

  useEffect(() => {
    if (veiwEight?.length < 8) {
      dispatch(setBranchwiseBtnDisable(true));
    } else {
      dispatch(setBranchwiseBtnDisable(false));
    }
  }, [dispatch, veiwEight?.length]);

  return (
    <div className="table">
      <BranchwiseTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((trans, i) => (
          <BranchwiseTableItems key={i} transaction={trans} />
        ))
      )}
    </div>
  );
}

export default BranchwiseTable;
