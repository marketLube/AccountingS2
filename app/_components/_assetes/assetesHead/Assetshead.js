"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setAssetsCurBank,
  setAssetsCurBranch,
  setAssetsCurCat,
  setAssetsCurParticular,
  setAssetsIsEdit,
  setIsAssetsNewEntry,
} from "@/lib/slices/assetsSlice";
import FsModal from "../../utils/FsModal";
import AssetesNewEntryForms from "../../_Forms/_assetesForms/AssetesNewEntryForms";
import AssetesEditForms from "../../_Forms/_assetesForms/AssetesEditForm";
import Selector from "../../utils/Selector";

function Assetshead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curBank,
    curBranch,
  } = useSelector((state) => state.assets);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setAssetsCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setAssetsCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setAssetsCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setAssetsCurBank(e.target.value));
  };

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
            curValue={curBranch}
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
