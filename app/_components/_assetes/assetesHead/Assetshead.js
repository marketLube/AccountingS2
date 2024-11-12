"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { setAssetsIsEdit, setIsAssetsNewEntry } from "@/lib/slices/assetsSlice";
import FsModal from "../../utils/FsModal";
import AssetesNewEntryForms from "../../_Forms/_assetesForms/AssetesNewEntryForms";
import AssetesEditForms from "../../_Forms/_assetesForms/AssetesEditForm";

function Assetshead() {
  const dispatch = useDispatch();
  const { isNewEntry, selectedItems, isEdit } = useSelector(
    (state) => state.assets
  );
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsAssetsNewEntry(true))}>
            + New Entri
          </Button>
          <Button
            onClick={() => dispatch(setAssetsIsEdit(true))}
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsAssetsNewEntry}>
        <AssetesNewEntryForms />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setAssetsIsEdit}>
        <AssetesEditForms />
      </FsModal>
    </>
  );
}

export default Assetshead;
