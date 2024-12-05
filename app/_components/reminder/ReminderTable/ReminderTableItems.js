"use client";

import {
  useBranchNameFinder,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import ParticularNameShower from "../../utils/_tooltipComponents/ParticularNameShower";
import { setReminderSelectedItems } from "@/lib/slices/reminderSlice";
import { useDispatch, useSelector } from "react-redux";

function ReminderTableItems({ item }) {
  const { selectedItems } = useSelector((state) => state.reminder);
  const particular = useParticularFinder(item?.particular);
  const category = useCategoryFinder(item?.catagory);

  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);
  const branch = useBranchNameFinder(item?.branch);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === item?._id) {
      dispatch(setReminderSelectedItems({}));
    } else {
      dispatch(setReminderSelectedItems(item));
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
        <span className="table-col amount table-body-col">
          {item?.amount?.toFixed(2)}
        </span>
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
        <span className="table-col branch table-body-col">{branch}</span>
        <span className="table-col status table-body-col">
          {item?.adminstatus}
        </span>
        <span className="table-col status table-body-col">
          {item?.accountstatus}
        </span>
      </div>
    </>
  );
}

export default ReminderTableItems;
