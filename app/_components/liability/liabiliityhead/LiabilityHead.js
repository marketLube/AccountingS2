"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLiabilityNewEntry,
  setLiabilityIsEdit,
} from "@/lib/slices/liabilitySlice";
import LiabilityNewEntirForm from "../../_Forms/_liabilityForms/LiabilityNewEntirForm";
import FsModal from "../../utils/FsModal";
import LiabilityEditForm from "../../_Forms/_liabilityForms/LiabilityEditForm";

function LiabilityHead() {
  const dispatch = useDispatch();
  const { isNewEntry, selectedItems, isEdit } = useSelector(
    (state) => state.liability
  );
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsLiabilityNewEntry(true))}>
            + New Entri
          </Button>
          <Button
            onClick={() => dispatch(setLiabilityIsEdit(true))}
            type={selectedItems?._id ? "primary" : "secondary"}
            disabled={selectedItems?._id}
          >
            Edit
          </Button>
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
      <FsModal isOpen={isEdit} setIsCancel={setLiabilityIsEdit}>
        <LiabilityEditForm />
      </FsModal>
    </>
  );
}

export default LiabilityHead;
