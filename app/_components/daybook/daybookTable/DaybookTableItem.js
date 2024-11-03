"use client";

import {
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";

function DaybookTableItem({ transaction }) {
  const particular = useParticularFinder(transaction.particular);
  const category = useCategoryFinder(transaction.catagory);

  return (
    <div className="table-col">
      <span className="table-check">
        <input type="checkbox" />
      </span>
      <span className="table-col particular table-body-col">
        {particular?.name}
      </span>
      <span className="table-col date table-body-col">
        {transaction?.formattedDate}
      </span>
      <span className="table-col amount table-body-col">
        {transaction?.amount}
      </span>
      <span className="table-col remark table-body-col">
        {transaction?.remark}
      </span>
      <span className="table-col branch table-body-col">Branch</span>
      <span className="table-col debit table-body-col">
        {transaction?.type === "Debit" ? "Debit" : "--"}
      </span>
      <span className="table-col credit table-body-col">
        {" "}
        {transaction?.type === "Credit" ? "Credit" : "--"}
      </span>
      <span className="table-col gst table-body-col">GST</span>
      <span className="table-col tds table-body-col">TDS</span>
    </div>
  );
}

export default DaybookTableItem;
