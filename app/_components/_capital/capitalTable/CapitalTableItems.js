"use client";

import {
  useBranchNameFinder,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import { truncate } from "@/app/_services/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setCapitalSelectedItems } from "@/lib/slices/capitalSlice";

function CapitalTableItems({ item }) {
  const { selectedItems } = useSelector((state) => state.capital);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  const branch = useBranchNameFinder(item.branch);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === item?._id) {
      dispatch(setCapitalSelectedItems({}));
    } else {
      dispatch(setCapitalSelectedItems(item));
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
          {item?.invested}
        </span>
        <span className="table-col date table-body-col">
          {item?.formattedDate}
        </span>
        <span className="table-col amount table-body-col">{item?.amount}</span>
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
        <span className="table-col type table-body-col">{item?.type}</span>
      </div>
    </>
  );
}

export default CapitalTableItems;
