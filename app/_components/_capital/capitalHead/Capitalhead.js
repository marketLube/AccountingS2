"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setCapitalBtnDisable,
  setCapitalCurBank,
  setCapitalCurBranch,
  setCapitalCurCat,
  setCapitalCurParticular,
  setCapitalIsEdit,
  setIsCapitalNewEntry,
} from "@/lib/slices/capitalSlice";
import CapitalNewEntryForms from "../../_Forms/_capitalForms/CapitalNewEntryForms";
import FsModal from "../../utils/FsModal";
import CapitalEditForms from "../../_Forms/_capitalForms/CapitalEditForm";
import Selector from "../../utils/Selector";

function Capitalhead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curBank,
  } = useSelector((state) => state.capital);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setCapitalCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setCapitalCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setCapitalCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setCapitalCurBank(e.target.value));
  };

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
