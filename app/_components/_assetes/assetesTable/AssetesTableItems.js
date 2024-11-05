"use client";

import {
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";

function AssetesTableItems({ item }) {
  const particular = useParticularFinder(item?.particular);
  const category = useCategoryFinder(item?.catagory);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
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
          item
        </span>
        <span className="table-col date table-body-col">date</span>
        <span className="table-col amount table-body-col">amount</span>
        <span
          className="table-col purchased table-body-col"
          onMouseEnter={() => setIsRemarkTooltip(true)}
          onMouseLeave={() => setIsRemarkTooltip(false)}
        >
          Purchased by
        </span>
        <span className="table-col remark table-body-col">Remark</span>
        <span className="table-col branch table-body-col">Branch</span>
      </div>
      <Tooltip
        isVisible={isParTooltip}
        parName={particular?.name}
        catName={category?.name}
        purpose={item?.purpose}
      />
      <Tooltip
        type="remark"
        isVisible={isRemarkTooltip}
        remark={item?.remark}
      />
    </>
  );
}

export default AssetesTableItems;