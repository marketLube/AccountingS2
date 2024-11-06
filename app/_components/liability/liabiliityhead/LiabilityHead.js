"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { setIsLiabilityNewEntry } from "@/lib/slices/liabilitySlice";
import LiabilityNewEntirForm from "../../_Forms/_liabilityForms/LiabilityNewEntirForm";
import FsModal from "../../utils/FsModal";

function LiabilityHead() {
  const dispatch = useDispatch();
  const { isNewEntry } = useSelector((state) => state.liability);
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsLiabilityNewEntry(true))}>
            + New Entri
          </Button>
          <Button type="secondary">Edit</Button>
          <Button type="thertiary">Log</Button>
        </>
        <>
          <Search />
          <Button type="filter">
            <GiSettingsKnobs />
          </Button>
        </>
      </LayoutHead>

      <FsModal isOpen={isNewEntry} setIsCancel={setIsLiabilityNewEntry}>
        <LiabilityNewEntirForm />
      </FsModal>
    </>
  );
}

export default LiabilityHead;
