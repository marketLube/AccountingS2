"use client";

import { useBranchNameFinder } from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";
import { setBudgetplannerSelectedItems } from "@/lib/slices/budgetplannerSlice";
import { useDispatch, useSelector } from "react-redux";

function BudgetplannerTableItems({ item }) {
  const { selectedItems } = useSelector((state) => state.budgetplanner);
  const branch = useBranchNameFinder(item?.branch);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === item?._id) {
      dispatch(setBudgetplannerSelectedItems({}));
    } else {
      dispatch(setBudgetplannerSelectedItems(item));
    }
  };

  return (
    <div className="table-col">
      <span className="table-check">
        <input
          type="checkbox"
          checked={selectedItems?._id === item?._id}
          onChange={handleCheckboxChange}
        />
      </span>
      <span className="table-col particular table-body-col">
        {truncate(item?.property)}
      </span>
      <span className="table-col date table-body-col">
        {item?.formattedDate}
      </span>
      <span className="table-col amount table-body-col">{item?.amount}</span>
      <span className="table-col change table-body-col">
        {item?.percentageDifference}
      </span>
      <span className="table-col total table-body-col">
        {item?.totalAmount}
      </span>
      <span className="table-col branch table-body-col">{branch}</span>
    </div>
  );
}

export default BudgetplannerTableItems;
