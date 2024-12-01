"use client";

import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import { setLedgerCurCat } from "@/lib/slices/ledgerSlice";
import Selector from "../../utils/Selector";

function LedgerHead() {
  const dispatch = useDispatch();
  const { curCat } = useSelector((state) => state.ledger);

  const { categoryNames } = useSelector((state) => state.general);

  const handleCatChange = (e) => {
    dispatch(setLedgerCurCat(e.target.value));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button type="secondary" style={{ opacity: "0" }}>
            Edit
          </Button>
        </>
        <>
          <Selector
            options={["All Categories", ...categoryNames]}
            callback={handleCatChange}
            curValue={curCat}
          />
        </>
      </LayoutHead>
    </>
  );
}

export default LedgerHead;
