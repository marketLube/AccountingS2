"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setCapitalBtnDisable,
  setCapitalIsEdit,
  setIsCapitalNewEntry,
} from "@/lib/slices/capitalSlice";
import CapitalNewEntryForms from "../../_Forms/_capitalForms/CapitalNewEntryForms";
import FsModal from "../../utils/FsModal";
import CapitalEditForms from "../../_Forms/_capitalForms/CapitalEditForm";

function Capitalhead() {
  const dispatch = useDispatch();
  const { isNewEntry, selectedItems, isEdit } = useSelector(
    (state) => state.capital
  );
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsCapitalNewEntry(true))}>
            + New Entri
          </Button>
          <Button
            onClick={() => dispatch(setCapitalIsEdit(true))}
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsCapitalNewEntry}>
        <CapitalNewEntryForms />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setCapitalIsEdit}>
        <CapitalEditForms />
      </FsModal>
    </>
  );
}

export default Capitalhead;
