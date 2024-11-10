"use client";

import { useBranchNameFinder } from "@/app/_services/finders";
import { truncate } from "@/app/_services/helpers";

function BudgetplannerTableItems({ item }) {
  const branch = useBranchNameFinder(item?.branch);

  return (
    <div className="table-col">
      <span className="table-check">
        <input type="checkbox" />
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
