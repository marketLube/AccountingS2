"use client";

import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setDaybookCurBank,
  setDaybookCurBranch,
  setDaybookCurCat,
  setDaybookCurParticular,
  setDaybookIsEdit,
  setIsDaybookNewEntri,
} from "@/lib/slices/daybookSlice";
import FsModal from "../../utils/FsModal";
import DaybookNewEntirForm from "../../_Forms/_daybookForms/DaybookNewEntirForm";
import DaybookEditForm from "../../_Forms/_daybookForms/DaybookEditForm";
import Selector from "../../utils/Selector";

function DaybookHead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curBank,
  } = useSelector((state) => state.daybook);
  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setDaybookCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setDaybookCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setDaybookCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setDaybookCurBank(e.target.value));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsDaybookNewEntri(true))}>
            + New Entri
          </Button>
          <Button>+ Bank to Bank</Button>
          <Button
            onClick={() => dispatch(setDaybookIsEdit(true))}
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
      </LayoutHead>

      <FsModal isOpen={isNewEntry} setIsCancel={setIsDaybookNewEntri}>
        <DaybookNewEntirForm />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setDaybookIsEdit}>
        <DaybookEditForm />
      </FsModal>
    </>
  );
}

export default DaybookHead;
