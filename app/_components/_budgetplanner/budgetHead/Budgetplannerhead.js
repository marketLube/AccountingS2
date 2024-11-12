"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import {
  setBudgetplannerIsEdit,
  setIsBudgetplannerNewEntry,
} from "@/lib/slices/budgetplannerSlice";
import { useDispatch, useSelector } from "react-redux";
import FsModal from "../../utils/FsModal";
import BudgetplannerNewEntryForm from "../../_Forms/_budgetplannerForms/BudgetplannerNewEntryForm";
import BudgetplannerEditForm from "../../_Forms/_budgetplannerForms/BudgetplannerEditForm";

function Budgetplannerhead() {
  const dispatch = useDispatch();
  const { isNewEntry, selectedItems, isEdit } = useSelector(
    (state) => state.budgetplanner
  );
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
