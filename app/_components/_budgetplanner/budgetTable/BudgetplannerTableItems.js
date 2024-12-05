"use client";

import { useBranchNameFinder } from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";
import { setBudgetplannerSelectedItems } from "@/lib/slices/budgetplannerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function BudgetplannerTableItems({ item }) {
  const { selectedItems, curRange } = useSelector(
    (state) => state.budgetplanner
  );
  const branch = useBranchNameFinder(item?.branch);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    if (selectedItems?._id === item?._id) {
      dispatch(setBudgetplannerSelectedItems({}));
    } else {
      dispatch(setBudgetplannerSelectedItems(item));
    }
  };

  const [total, setTotal] = useState(item?.amount * 1);
  useEffect(() => {
    if (curRange.startsWith("One")) {
      setTotal(item?.amount * 1);
    } else if (curRange.startsWith("Three")) {
      setTotal(item?.amount * 3);
    } else if (curRange.startsWith("Six")) {
      setTotal(item?.amount * 6);
    }
  }, [curRange, item]);

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
      <span className="table-col amount table-body-col">{total}</span>
      <span className="table-col change table-body-col">
        {item?.percentageDifference}
      </span>
      <span className="table-col total table-body-col">
        {item?.totalAmount?.toFixed(2)}
      </span>
      <span className="table-col branch table-body-col">{branch}</span>
    </div>
  );
}

export default BudgetplannerTableItems;
