"use client";

import {
  getBranchNames,
  useBankFinder,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";

import { truncate } from "@/app/_services/helpers";
import Tooltip from "../../utils/Tooltip";
import { useEffect, useState } from "react";
import ParticularNameShower from "../../utils/_tooltipComponents/ParticularNameShower";
import BranchShower from "../../utils/_tooltipComponents/BranchShower";
import { useDispatch, useSelector } from "react-redux";
import { setDaybookSelectedItems } from "@/lib/slices/daybookSlice";
import GstShower from "../../utils/_tooltipComponents/GstShower";

function DaybookTableItem({ transaction }) {
  const { selectedItems, curBranch } = useSelector((state) => state.daybook);
  const particular = useParticularFinder(transaction.particular);
  const category = useCategoryFinder(transaction.catagory);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  const [isBranchesTooltip, setIsBranchesTooltip] = useState(false);
  const [amount, setAmount] = useState(0);
  const [tdsPercentage, setTdsPercentage] = useState(0);
  const [tdsAmount, setTdsAmount] = useState(0);

  const branchNames = getBranchNames(transaction?.branches);
  const bank = useBankFinder(transaction?.bank);

  const branchAmt = transaction?.branches?.find(
    (branch) => branch.branch.name === curBranch
  )?.branchTotalAmt;

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === transaction?._id) {
      dispatch(setDaybookSelectedItems({}));
    } else {
      dispatch(setDaybookSelectedItems(transaction));
    }
  };

  useEffect(() => {
    // Initialize TDS values based on current branch
    let computedAmount = parseFloat(transaction?.totalAmt) || 0;
    const computedTdsPercentage = parseFloat(transaction?.tds) || 0;

    if (!curBranch.startsWith("All") && branchAmt) {
      computedAmount = parseFloat(branchAmt) || 0;
    }

    const computedTdsAmount = (computedAmount * computedTdsPercentage) / 100;

    // Update state
    setAmount(computedAmount);
    setTdsPercentage(computedTdsPercentage);
    setTdsAmount(computedTdsAmount);
  }, [curBranch, branchAmt, transaction?.totalAmt, transaction?.tds]);

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
          {!curBranch.startsWith("All")
            ? transaction?.branches?.find(
                (branch) => branch.branch.name === curBranch
              )?.amount
            : transaction?.amount?.toFixed(2)}
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
          <>
            <BranchShower branches={branchNames} curBranch={curBranch} />
            <Tooltip
              type="branches"
              isVisible={isBranchesTooltip}
              branches={branchNames}
            />
          </>
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
        <span
          className="table-col tds table-body-col"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".2rem",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <div>{tdsPercentage}%</div>
          <div>{tdsAmount.toFixed(2)}</div>
        </span>
      </div>
    </>
  );
}

export default DaybookTableItem;
