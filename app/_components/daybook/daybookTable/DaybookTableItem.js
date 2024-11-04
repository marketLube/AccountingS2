"use client";

import {
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";

function DaybookTableItem({ transaction }) {
  const particular = useParticularFinder(transaction.particular);
  const category = useCategoryFinder(transaction.catagory);

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
          {truncate(particular?.name)}
        </span>
        <span className="table-col date table-body-col">
          {transaction?.formattedDate}
        </span>
        <span className="table-col amount table-body-col">
          {transaction?.amount}
        </span>
        <span
          className="table-col remark table-body-col"
          onMouseEnter={() => setIsRemarkTooltip(true)}
          onMouseLeave={() => setIsRemarkTooltip(false)}
        >
          {truncate(transaction?.remark)}
        </span>
        <span className="table-col branch table-body-col">Branch</span>
        <span className="table-col debit table-body-col">
          {transaction?.type === "Debit" ? "Debit" : "--"}
        </span>
        <span className="table-col credit table-body-col">
          {" "}
          {transaction?.type === "Credit" ? "Credit" : "--"}
        </span>
        <span className="table-col gst table-body-col">GST</span>
        <span className="table-col tds table-body-col">TDS</span>
      </div>
      <Tooltip
        isVisible={isParTooltip}
        parName={particular?.name}
        catName={category?.name}
        purpose={transaction?.purpose}
      />
      <Tooltip
        type="remark"
        isVisible={isRemarkTooltip}
        remark={transaction?.remark}
      />
    </>
  );
}

export default DaybookTableItem;
