"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setLedgerCurBank,
  setLedgerCurBranch,
  setLedgerCurCat,
  setLedgerCurParticular,
} from "@/lib/slices/ledgerSlice";
import Selector from "../../utils/Selector";

function LedgerHead() {
  const dispatch = useDispatch();
  const { particulars, curCat, curParticular, curBank } = useSelector(
    (state) => state.ledger
  );

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setLedgerCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setLedgerCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setLedgerCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setLedgerCurBank(e.target.value));
  };

  return (
    <LayoutHead>
      <>
        <Button type="secondary">Edit</Button>
      </>
      <>
        <Selector
          options={["All Categories", ...categoryNames]}
          callback={handleCatChange}
        />
        <Selector
          options={["All Particulars", ...particulars]}
          callback={handleParticularChange}
          disabled={curCat?.startsWith("All")}
          curValue={curParticular}
        />
        <Selector
          options={["All Branches", ...branchNames]}
          callback={handleBranchChange}
        />
        <Selector
          options={["All Banks", ...bankNames]}
          callback={handlebankChange}
          curValue={curBank}
        />
        <Search />
        <Button type="filter">
          <GiSettingsKnobs />
        </Button>
      </>
      <>
        <Search />
        <Button type="filter">
          <GiSettingsKnobs />
        </Button>
      </>
    </LayoutHead>
  );
}

export default LedgerHead;
