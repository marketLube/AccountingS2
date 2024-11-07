"use client";

import {
  useBranchNameFinder,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import { truncate } from "@/app/_services/helpers";

function CapitalTableItems({ item }) {
  const particular = useParticularFinder(item?.particular);
  const category = useCategoryFinder(item?.catagory);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  const branch = useBranchNameFinder(item.branch);

  return (
    <>
      <div className="table-col">
        <span className="table-check">
          <input type="checkbox" />
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
      </div>
    </>
  );
}

export default CapitalTableItems;
