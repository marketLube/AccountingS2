"use client";
import Button from "@/app/_components/utils/Button";
import { setDaybookType } from "@/lib/slices/daybookSlice";
import { useDispatch, useSelector } from "react-redux";

function DaybookFooterBtns() {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.daybook);

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
        Expanse
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
    </>
  );
}

export default DaybookFooterBtns;
