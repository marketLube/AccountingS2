"use client";
import Button from "@/app/_components/utils/Button";
import { useGstTotals } from "@/app/_hooks/useTransactions";
import { setDaybookType } from "@/lib/slices/daybookSlice";
import { useDispatch, useSelector } from "react-redux";

function DaybookFooterBtns() {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.daybook);

  const { data } = useGstTotals();

  return (
    <>
      <Button
        type={type === "All Status" ? "primary" : "thertiary"}
        onClick={() => dispatch(setDaybookType("All Status"))}
      >
        All Status
      </Button>
      <Button
        type={type === "Debit" ? "primary" : "thertiary"}
        onClick={() => dispatch(setDaybookType("Debit"))}
      >
        Expense
      </Button>
      <Button
        type={type === "Credit" ? "primary" : "thertiary"}
        onClick={() => dispatch(setDaybookType("Credit"))}
      >
        Income
      </Button>
      <Button
        type={type === "Bank" ? "primary" : "thertiary"}
        onClick={() => dispatch(setDaybookType("Bank"))}
      >
        Bank
      </Button>
      {data && (
        <>
          <Button>Incl : {data[1]?.totalAmount || 0}</Button>
          <Button>Excl : {data[2]?.totalAmount || 0}</Button>
        </>
      )}
    </>
  );
}

export default DaybookFooterBtns;
