"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import {
  setBudgetplannerCurBank,
  setBudgetplannerCurBranch,
  setBudgetplannerCurCat,
  setBudgetplannerCurParticular,
  setBudgetplannerIsEdit,
  setIsBudgetplannerNewEntry,
} from "@/lib/slices/budgetplannerSlice";
import { useDispatch, useSelector } from "react-redux";
import FsModal from "../../utils/FsModal";
import BudgetplannerNewEntryForm from "../../_Forms/_budgetplannerForms/BudgetplannerNewEntryForm";
import BudgetplannerEditForm from "../../_Forms/_budgetplannerForms/BudgetplannerEditForm";
import Selector from "../../utils/Selector";

function Budgetplannerhead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curBank,
  } = useSelector((state) => state.budgetplanner);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setBudgetplannerCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setBudgetplannerCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setBudgetplannerCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setBudgetplannerCurBank(e.target.value));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsBudgetplannerNewEntry(true))}>
            + New Entri
          </Button>
          <Button
            onClick={() => dispatch(setBudgetplannerIsEdit(true))}
            type={selectedItems?._id ? "primary" : "secondary"}
            disabled={selectedItems?._id}
          >
            Edit
          </Button>
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsBudgetplannerNewEntry}>
        <BudgetplannerNewEntryForm />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setBudgetplannerIsEdit}>
        <BudgetplannerEditForm />
      </FsModal>
    </>
  );
}

export default Budgetplannerhead;
