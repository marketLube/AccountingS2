"use client";
import { useSelector } from "react-redux";
import { useViewEight } from "@/app/_services/helpers";
import TableLoader from "../../_loader/TableLoader";
import { setAssetsBtnDisable } from "@/lib/slices/assetsSlice";
import AssetesTableItems from "./AssetesTableItems";
import AssetesTableHead from "./AssetesTableHead";
import useAssets from "@/app/_hooks/useAssets";

function AssetsTable() {
  const { startPage } = useSelector((state) => state.assets);

  const { assets, isError, isLoading, error } = useAssets();
  const veiwEight = useViewEight(assets, startPage, setAssetsBtnDisable);

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
