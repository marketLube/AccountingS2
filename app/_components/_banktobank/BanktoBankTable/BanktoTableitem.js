"use client";

import { useBankFinder, useBranchNameFinder } from "@/app/_services/finders";
import formatDate from "@/app/_services/helpers";

function BanktoTableitem({ banktobank }) {
  console.log(banktobank, "ooooooooo");

  const tobank = useBankFinder(banktobank.toBank);
  const frombank = useBankFinder(banktobank.fromBank);
  const frombranch = useBranchNameFinder(banktobank.fromBranch);
  const tobranch = useBranchNameFinder(banktobank.toBranch);
  const date = formatDate(new Date(banktobank.createdAt));
  console.log(tobank, "///////////");
  console.log(frombank, "-----------");

  return (
    <>
      <div className="table-col">
        <span className="table-check">
          <input type="checkbox" />
        </span>
        <span className="table-col banktobank table-body-col">{date}</span>
        <span className="table-col banktobank table-body-col">
          {frombank?.name}
        </span>
        <span className="table-col banktobank table-body-col">
          {frombranch}
        </span>
        <span className="table-col banktobank table-body-col">
          {tobank?.name}
        </span>
        <span className="table-col banktobank table-body-col">{tobranch}</span>
        <span className="table-col banktobank table-body-col">
          {banktobank?.amount}
        </span>
      </div>
    </>
  );
}

export default BanktoTableitem;