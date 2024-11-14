"use client";

import {
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import { setLedgerSelectedItems } from "@/lib/slices/ledgerSlice";
import { useDispatch, useSelector } from "react-redux";

function LedgerTableItems({ item }) {
  const { selectedItems } = useSelector((state) => state.ledger);
  const particular = useParticularFinder(item?.particular);
  const category = useCategoryFinder(item?.catagory);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  console.log(item, "dataasssssss");

  const particularObj = useParticularFinder(item?.particular);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === item?._id) {
      dispatch(setLedgerSelectedItems({}));
    } else {
      dispatch(setLedgerSelectedItems(item));
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
        <span
          className="table-col particular table-body-col"
          onMouseEnter={() => setIsPartooltip(true)}
          onMouseLeave={() => setIsPartooltip(false)}
        >
          {particularObj?.name}
        </span>
        <span className="table-col date table-body-col">
          {item?.formattedDate}
        </span>
        <span className="table-col amount table-body-col">{item?.amount}</span>
        <span className="table-col debit table-body-col">{item?.debited}</span>
        <span className="table-col credit table-body-col">
          {item?.credited}
        </span>
        <span className="table-col liability table-body-col">
          {item?.liability}
        </span>
        <span className="table-col liability table-body-col">
          {item?.outstanding}
        </span>
        <span className="table-col branch table-body-col">{item?.Tdspaid}</span>
        <span className="table-col branch table-body-col">
          {item?.TdsRecieved}
        </span>
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

export default LedgerTableItems;
