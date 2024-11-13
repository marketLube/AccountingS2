"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setDaybookCurBank,
  setIsLiabilityNewEntry,
  setLiabilityIsEdit,
} from "@/lib/slices/liabilitySlice";
import LiabilityNewEntirForm from "../../_Forms/_liabilityForms/LiabilityNewEntirForm";
import FsModal from "../../utils/FsModal";
import LiabilityEditForm from "../../_Forms/_liabilityForms/LiabilityEditForm";
import Selector from "../../utils/Selector";

function LiabilityHead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curBank,
  } = useSelector((state) => state.liability);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setLiabilityCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setLiabilityCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setLiabilityCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setLiabilityCurBank(e.target.value));
  };

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
