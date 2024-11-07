"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { setIsCapitalNewEntry } from "@/lib/slices/capitalSlice";
import CapitalNewEntryForms from "../../_Forms/_capitalForms/CapitalNewEntryForms";
import FsModal from "../../utils/FsModal";

function Capitalhead() {
  const dispatch = useDispatch();
  const { isNewEntry } = useSelector((state) => state.capital);
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsCapitalNewEntry(true))}>
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsCapitalNewEntry}>
        <CapitalNewEntryForms />
      </FsModal>
    </>
  );
}

export default Capitalhead;
