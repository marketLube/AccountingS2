"use client";

import {
  branchNameFinder,
  getBranchNames,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import ParticularNameShower from "./ParticularNameShower";
import BranchShower from "./BranchShower";

function DaybookTableItem({ transaction }) {
  const particular = useParticularFinder(transaction.particular);
  const category = useCategoryFinder(transaction.catagory);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  const [isBranchesTooltip, setIsBranchesTooltip] = useState(false);

  const branchNames = getBranchNames(transaction?.branches);
  console.log(branchNames, "branchNames");

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
          <ParticularNameShower particular={particular} data={transaction} />
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
        <span
          className="table-col branch table-body-col"
          onMouseEnter={() => setIsBranchesTooltip(true)}
          onMouseLeave={() => setIsBranchesTooltip(false)}
        >
          <BranchShower branches={branchNames} />
        </span>
        <span className="table-col debit table-body-col">
          {transaction?.type === "Debit" ? "Debit" : "--"}
        </span>
        <span className="table-col credit table-body-col">
          {transaction?.type === "Credit" ? "Credit" : "--"}
        </span>
        <span className="table-col gst table-body-col">
          {transaction?.gstPercent}
        </span>
        <span className="table-col tds table-body-col">{transaction?.tds}</span>
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
      <Tooltip
        type="branches"
        isVisible={isBranchesTooltip}
        branches={branchNames}
      />
    </>
  );
}

export default DaybookTableItem;
