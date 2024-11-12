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
          Particular
        </span>
        <span className="table-col date table-body-col">date</span>
        <span className="table-col amount table-body-col">amount</span>
        <span className="table-col debit table-body-col">debited</span>
        <span className="table-col credit table-body-col">Credited</span>
        <span className="table-col liability table-body-col">liability</span>
        <span className="table-col outstanding table-body-col">
          outstanding
        </span>
        <span className="table-col tds table-body-col">Tds paid</span>
        <span className="table-col tds table-body-col">Tds Recieved</span>
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
