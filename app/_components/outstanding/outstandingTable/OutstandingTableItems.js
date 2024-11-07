"use client";

import {
  getBranchNames,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import BranchShower from "../../utils/_tooltipComponents/BranchShower";
import ParticularNameShower from "../../utils/_tooltipComponents/ParticularNameShower";

function OutstandingTableItems({ item }) {
  const particular = useParticularFinder(item?.particular);
  const category = useCategoryFinder(item?.catagory);
  const [isBranchesTooltip, setIsBranchesTooltip] = useState(false);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  const branchNames = getBranchNames(item?.branches);

  return (
    <>
      <div className="table-col">
        <span className="table-check">
          <input type="checkbox" />
        </span>
        <span
          className="table-col particular table-body-col"
          onMouseEnter={() => setIsPartooltip(true)}
          onMouseLeave={() => setIsPartooltip(false)}
        >
          <ParticularNameShower particular={particular} data={item} />
          <Tooltip
            isVisible={isParTooltip}
            parName={particular?.name}
            catName={category?.name}
            purpose={item?.purpose}
          />
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
        <span
          className="table-col branch table-body-col"
          onMouseEnter={() => setIsBranchesTooltip(true)}
          onMouseLeave={() => setIsBranchesTooltip(false)}
        >
          <BranchShower branches={branchNames} />
          <Tooltip
            type="branches"
            isVisible={isBranchesTooltip}
            branches={branchNames}
          />
        </span>
        <span className="table-col status table-body-col">{item?.status}</span>
      </div>
    </>
  );
}

export default OutstandingTableItems;
