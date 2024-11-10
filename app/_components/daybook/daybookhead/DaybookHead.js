"use client";

import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setDaybookCurBranch,
  setDaybookCurCat,
  setDaybookIsEdit,
  setIsDaybookNewEntri,
} from "@/lib/slices/daybookSlice";
import FsModal from "../../utils/FsModal";
import DaybookNewEntirForm from "../../_Forms/_daybookForms/DaybookNewEntirForm";
import DaybookEditForm from "../../_Forms/_daybookForms/DaybookEditForm";
import Selector from "../../utils/Selector";

function DaybookHead() {
  const dispatch = useDispatch();
  const { isNewEntry, selectedItems, isEdit, curCat } = useSelector(
    (state) => state.daybook
  );
  const { branchNames, categoryNames } = useSelector((state) => state.general);

  const handleBranchChange = (e) => {
    dispatch(setDaybookCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setDaybookCurCat(e.target.value));
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
            options={["Select a Category", ...categoryNames]}
            callback={handleCatChange}
          />
          <Selector
            options={["All Branches", ...branchNames]}
            callback={handleBranchChange}
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
