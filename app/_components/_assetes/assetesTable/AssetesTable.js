"use client";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import useReminders from "@/app/_hooks/useReminders";
import { setAssetsBtnDisable } from "@/lib/slices/assetsSlice";
import AssetesTableItems from "./AssetesTableItems";
import AssetesTableHead from "./AssetesTableHead";

function AssetsTable() {
  const { startPage } = useSelector((state) => state.assets);

  const { refetch, reminders, isError, isLoading, error } = useReminders();
  const veiwEight = useViewEight(reminders, startPage, setAssetsBtnDisable);

  return (
    <div className="table">
      <AssetesTableHead />
      {isLoading ? (
        <TableLoader />
      ) : isError ? (
        <TableLoader error="Something Went Wrong..." />
      ) : (
        veiwEight?.map((liab, i) => (
          <AssetesTableItems key={i} item={liab}></AssetesTableItems>
        ))
      )}
    </div>
  );
}

export default AssetsTable;
