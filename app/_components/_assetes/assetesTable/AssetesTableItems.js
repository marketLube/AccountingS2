"use client";

import { useBranchNameFinder } from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAssetsSelectedItems } from "@/lib/slices/assetsSlice";

function AssetesTableItems({ item }) {
  const { selectedItems } = useSelector((state) => state.assets);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  const branch = useBranchNameFinder(item.branch);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === item?._id) {
      dispatch(setAssetsSelectedItems({}));
    } else {
      dispatch(setAssetsSelectedItems(item));
    }
  };

  return (
    <>
      <div className="table-col">
        <span className="table-check">
          <input
            type="checkbox"
            checked={selectedItems?._id === item?._id}
            onChange={handleCheckboxChange}
          />
        </span>
        <span className="table-col particular table-body-col">
          {item?.item}
        </span>
        <span className="table-col date table-body-col">
          {item?.formattedDate}
        </span>
        <span className="table-col amount table-body-col">
          {item?.amount?.toFixed(2) || 0}
        </span>
        <span className="table-col purchased table-body-col">
          {item?.purchasedBy}
        </span>
        <span
          className="table-col remark table-body-col"
          onMouseEnter={() => setIsRemarkTooltip(true)}
          onMouseLeave={() => setIsRemarkTooltip(false)}
        >
          {truncate(item?.remark)}
          <Tooltip
            type="remark"
            isVisible={isRemarkTooltip}
            remark={item?.remark}
          />
        </span>
        <span className="table-col branch table-body-col">{branch}</span>
        <span className="table-col branch table-body-col">{item?.type}</span>
      </div>
    </>
  );
}

export default AssetesTableItems;
