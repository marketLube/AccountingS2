"use client";

import {
  getBranchNames,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";

import { truncate } from "@/app/_services/helpers";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import ParticularNameShower from "../../utils/_tooltipComponents/ParticularNameShower";
import { useDispatch, useSelector } from "react-redux";
import { setBranchwiseSelectedItems } from "@/lib/slices/branchwiseSlice";

function BranchwiseTableItems({ transaction }) {
  const { selectedItems } = useSelector((state) => state.branchwise);
  const particular = useParticularFinder(transaction.particular);
  const category = useCategoryFinder(transaction.catagory);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  const { curBranch } = useSelector((state) => state.branchwise);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === transaction?._id) {
      dispatch(setBranchwiseSelectedItems({}));
    } else {
      dispatch(setBranchwiseSelectedItems(transaction));
    }
  };

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
          {Number(
            transaction?.branches?.find(
              (obj) => obj?.branch?.name === curBranch
            )?.amount || 0
          ).toFixed(2)}
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

        <span className="table-col debit table-body-col">
          {transaction?.type === "Debit" ? "Debit" : "--"}
        </span>
        <span className="table-col credit table-body-col">
          {transaction?.type === "Credit" ? "Credit" : "--"}
        </span>
        <span
          className="table-col branch table-body-col"
          onMouseEnter={() => setIsBranchesTooltip(true)}
          onMouseLeave={() => setIsBranchesTooltip(false)}
        >
          {curBranch}
        </span>
      </div>
    </>
  );
}

export default BranchwiseTableItems;
