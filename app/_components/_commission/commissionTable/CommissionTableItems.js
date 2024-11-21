"use client";

import Tooltip from "../../utils/Tooltip";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommissionSelectedItems } from "@/lib/slices/CommissionSlice";

function CommissionTableItems({ item }) {
  const { selectedItems } = useSelector((state) => state.commission);
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

        <div className="table-col particular table-body-col students">
          <span>Students</span>
          <span style={{ color: "gray" }}>UK BPP</span>
          <span style={{ color: "gray" }}>hanna releaved</span>
          <span style={{ color: "gray" }}>November| November-March</span>
        </div>
        <span className="table-col date table-body-col">Date</span>
        <span className="table-col branch table-body-col">Branch</span>
        <span className="table-col courseFee table-body-col">Course Fee</span>
        <span
          className="table-col remark table-body-col"
          onMouseEnter={() => setIsRemarkTooltip(true)}
          onMouseLeave={() => setIsRemarkTooltip(false)}
        >
          Remark
          <Tooltip
            type="remark"
            isVisible={isRemarkTooltip}
            remark={item?.remark}
          />
        </span>
        <span className="table-col receivable table-body-col">Receivable</span>
        <span className="table-col status table-body-col">Status</span>
        <span className="table-col agent table-body-col">Agent</span>
      </div>
    </>
  );
}

export default CommissionTableItems;
