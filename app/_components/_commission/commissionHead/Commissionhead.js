"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import { Search } from "lucide-react";
import { setIsCommissionNewEntry } from "@/lib/slices/CommissionSlice";
import { useDispatch, useSelector } from "react-redux";
import FsModal from "../../utils/FsModal";
import CommissionNewEntryForm from "../../_Forms/_commissionForms/CommissionNewEntryForm";

function Commissionhead() {
  const dispatch = useDispatch();
  const { isNewEntry } = useSelector((state) => state.commission);
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
