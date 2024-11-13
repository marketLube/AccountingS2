"use client";

import {
  getBranchNames,
  useBankFinder,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";

import { truncate } from "@/app/_services/helpers";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import ParticularNameShower from "../../utils/_tooltipComponents/ParticularNameShower";
import BranchShower from "../../utils/_tooltipComponents/BranchShower";
import { useDispatch, useSelector } from "react-redux";
import { setDaybookSelectedItems } from "@/lib/slices/daybookSlice";
import GstShower from "../../utils/_tooltipComponents/GstShower";

function DaybookTableItem({ transaction }) {
  const { selectedItems } = useSelector((state) => state.daybook);
  const particular = useParticularFinder(transaction.particular);
  const category = useCategoryFinder(transaction.catagory);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  const [isBranchesTooltip, setIsBranchesTooltip] = useState(false);
  const branchNames = getBranchNames(transaction?.branches);
  const bank = useBankFinder(transaction?.bank);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === transaction?._id) {
      dispatch(setDaybookSelectedItems({}));
    } else {
      dispatch(setDaybookSelectedItems(transaction));
    }
  };

  const amount = parseFloat(transaction?.amount) || 0;
  const tdsPercentage = parseFloat(transaction?.tds) || 0;
  const tdsAmount = (amount * tdsPercentage) / 100;

  return (
    <>
      <div className="table-col">
        <span className="table-check">
          <input
            type="checkbox"
            checked={selectedItems?._id === transaction?._id}
            onChange={handleCheckboxChange}
          />
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
          {truncate(transaction?.remark, 20)}
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
        <span className="table-col bank table-body-col">{bank?.name}</span>

        <span className="table-col debit table-body-col">
          {transaction?.type === "Debit" ? "Debit" : "--"}
        </span>
        <span className="table-col credit table-body-col">
          {transaction?.type === "Credit" ? "Credit" : "--"}
        </span>
        <span className="table-col gst table-body-col">
          <GstShower data={transaction} amount={transaction.amount} />
        </span>
        <span className="table-col tds table-body-col">{tdsAmount}</span>
      </div>
    </>
  );
}

export default DaybookTableItem;
