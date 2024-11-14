"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import {
  setCommissionCurBank,
  setCommissionCurBranch,
  setCommissionCurCat,
  setCommissionCurParticular,
  setIsCommissionNewEntry,
} from "@/lib/slices/CommissionSlice";
import { useDispatch, useSelector } from "react-redux";
import FsModal from "../../utils/FsModal";
import CommissionNewEntryForm from "../../_Forms/_commissionForms/CommissionNewEntryForm";
import Selector from "../../utils/Selector";

function Commissionhead() {
  const dispatch = useDispatch();
  const { isNewEntry, particulars, curCat, curParticular, curBank } =
    useSelector((state) => state.commission);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setCommissionCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setCommissionCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setCommissionCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setCommissionCurBank(e.target.value));
  };
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsCommissionNewEntry(true))}>
            + New Entri
          </Button>
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
        </>
        <>
          <Search />
          <Button type="filter">
            <GiSettingsKnobs />
          </Button>
        </>
      </LayoutHead>

      <FsModal isOpen={isNewEntry} setIsCancel={setIsCommissionNewEntry}>
        <CommissionNewEntryForm />
      </FsModal>
    </>
  );
}

export default Commissionhead;
