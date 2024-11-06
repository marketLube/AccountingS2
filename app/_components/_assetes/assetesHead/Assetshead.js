"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { setIsAssetsNewEntry } from "@/lib/slices/assetsSlice";
import FsModal from "../../utils/FsModal";
import AssetesNewEntryForms from "../../_Forms/_assetesForms/AssetesNewEntryForms";

function Assetshead() {
  const dispatch = useDispatch();
  const { isNewEntry } = useSelector((state) => state.assets);
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsAssetsNewEntry(true))}>
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsAssetsNewEntry}>
        <AssetesNewEntryForms />
      </FsModal>
    </>
  );
}

export default Assetshead;
