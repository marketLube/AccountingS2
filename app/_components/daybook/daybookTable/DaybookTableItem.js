"use client";

import {
  getBranchNames,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";
import Tooltip from "../../utils/Tooltip";
import { useEffect, useState } from "react";
import ParticularNameShower from "./ParticularNameShower";
import BranchShower from "./BranchShower";
import { useDispatch, useSelector } from "react-redux";
import { setDaybookSelectedItems } from "@/lib/slices/daybookSlice";

function DaybookTableItem({ transaction }) {
  const { selectedItems } = useSelector((state) => state.daybook);

  const particular = useParticularFinder(transaction.particular);
  const category = useCategoryFinder(transaction.catagory);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  const [isBranchesTooltip, setIsBranchesTooltip] = useState(false);
  const branchNames = getBranchNames(transaction?.branches);

  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(selectedItems.length === 1);

  useEffect(() => {
    if (isChecked) {
      dispatch(setDaybookSelectedItems([transaction]));
    } else {
      dispatch(setDaybookSelectedItems([]));
    }
  }, [isChecked]);

  const toggleChecked = () => {
    if (isChecked) {
      dispatch(setDaybookSelectedItems([transaction]));
    } else {
      dispatch(setDaybookSelectedItems([]));
    }
  };

  return (
    <>
      <div className="table-col">
        <span className="table-check">
          <input type="checkbox" checked={isChecked} onChange={toggleChecked} />
        </span>
        <span
          className="table-col particular table-body-col"
          onMouseEnter={() => setIsPartooltip(true)}
          onMouseLeave={() => setIsPartooltip(false)}
        >
          <ParticularNameShower particular={particular} data={transaction} />
          <Tooltip
            isVisible={isParTooltip}
            parName={particular?.name}
            catName={category?.name}
            purpose={transaction?.purpose}
          />
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
          <Tooltip
            type="remark"
            isVisible={isRemarkTooltip}
            remark={transaction?.remark}
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
    </>
  );
}

export default DaybookTableItem;
