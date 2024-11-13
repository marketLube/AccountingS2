"use client";

import {
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommissionSelectedItems } from "@/lib/slices/CommissionSlice";

function CommissionTableItems({ item }) {
  const { selectedItems } = useSelector((state) => state.commission);
  const particular = useParticularFinder(item?.particular);
  const category = useCategoryFinder(item?.catagory);
  const [isParTooltip, setIsPartooltip] = useState(false);
  const [isRemarkTooltip, setIsRemarkTooltip] = useState(false);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === item?._id) {
      dispatch(setCommissionSelectedItems({}));
    } else {
      dispatch(setCommissionSelectedItems(item));
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
        <span className="table-col particular table-body-col">Date</span>
        <div>
          <span className="table-col date table-body-col">Students</span>
          <span
            className="table-col date table-body-col"
            style={{ color: "gray" }}
          >
            UK BPP
          </span>
          <span
            className="table-col date table-body-col"
            style={{ color: "gray" }}
          >
            hanna releaved
          </span>
          <span
            className="table-col date table-body-col"
            style={{ color: "gray" }}
          >
            November| November-March
          </span>
        </div>
        <span className="table-col amount table-body-col">Branch</span>
        <span className="table-col remark table-body-col">Course Fee</span>
        <span className="table-col branch table-body-col">Receivable</span>
        <span className="table-col branch table-body-col">Status</span>
        <span className="table-col branch table-body-col">Agent</span>
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

export default CommissionTableItems;
