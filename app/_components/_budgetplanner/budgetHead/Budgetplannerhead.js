"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import { Search } from "lucide-react";
import { setIsBudgetplannerNewEntry } from "@/lib/slices/budgetplannerSlice";
import { useDispatch, useSelector } from "react-redux";
import FsModal from "../../utils/FsModal";
import BudgetplannerNewEntryForm from "../../_Forms/_budgetplannerForms/BudgetplannerNewEntryForm";

function Budgetplannerhead() {
  const dispatch = useDispatch();
  const { isNewEntry } = useSelector((state) => state.budgetplanner);
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsBudgetplannerNewEntry(true))}>
            + New Entri
          </Button>
          <Button type="secondary">Edit</Button>
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
    </>
  );
}

export default Budgetplannerhead;
