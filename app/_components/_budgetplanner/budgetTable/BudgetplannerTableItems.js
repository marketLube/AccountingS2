"use client";

import { useBranchNameFinder } from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";
import { setBudgetplannerSelectedItems } from "@/lib/slices/budgetplannerSlice";
import { useEffect, useRef } from "react";
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

  const total = useRef(item?.totalAmount);
  useEffect(() => {
    if (curRange.startsWith("One")) {
      total.current = item?.totalAmount * 1;
    } else if (curRange.startsWith("Three")) {
      total.current = item?.totalAmount * 3;
    } else if (curRange.startsWith("Six")) {
      total.current = item?.totalAmount * 6;
    }
  }, [curRange]);

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
      <span className="table-col total table-body-col">{total.current}</span>
      <span className="table-col branch table-body-col">{branch}</span>
    </div>
  );
}

export default BudgetplannerTableItems;
