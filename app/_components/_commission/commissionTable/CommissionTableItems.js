"use client";

import { useDispatch, useSelector } from "react-redux";
import { setCommissionSelectedItems } from "@/lib/slices/CommissionSlice";
import { useBranchNameFinder } from "@/app/_services/finders";

function CommissionTableItems({ item }) {
  const { selectedItems } = useSelector((state) => state.commission);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === item?._id) {
      dispatch(setCommissionSelectedItems({}));
    } else {
      dispatch(setCommissionSelectedItems(item));
    }
  };

  const curBranch = useBranchNameFinder(item?.branch);

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
          <span>{item?.student}</span>
          <span style={{ color: "gray" }}>{item?.country}</span>
          <span style={{ color: "gray" }}>{item?.counsillor}</span>
          <span style={{ color: "gray" }}>
            {item?.intakeMonth} | {item?.intake}
          </span>
          <span style={{ color: "gray" }}>{item?.university}</span>
        </div>
        <span className="table-col branch table-body-col">
          {new Date(item?.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
        <span className="table-col branch table-body-col">{curBranch}</span>
        <span className="table-col courseFee table-body-col">
          {item?.courseFee}
        </span>

        <span className="table-col receivable table-body-col">
          {item?.receivable}
        </span>
        <span className="table-col status table-body-col">{item?.status}</span>
        <span className="table-col agent table-body-col">{item?.agent}</span>
      </div>
    </>
  );
}

export default CommissionTableItems;
