"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsReminderNewEntry,
  setReminderIsEdit,
} from "@/lib/slices/reminderSlice";
import FsModal from "../../utils/FsModal";
import ReminderNewEntryForm from "../../_Forms/_reminderForms/ReminderNewEntryForm";
import ReminderEditForm from "../../_Forms/_reminderForms/ReminderEditForm";
import Selector from "../../utils/Selector";

function Reminderhead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curBank,
  } = useSelector((state) => state.reminder);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setReminderCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setReminderCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setReminderCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setReminderCurBank(e.target.value));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsReminderNewEntry(true))}>
            + New Entri
          </Button>
          <Button
            onClick={() => dispatch(setReminderIsEdit(true))}
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
      <FsModal isOpen={isNewEntry} setIsCancel={setIsReminderNewEntry}>
        <ReminderNewEntryForm />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setReminderIsEdit}>
        <ReminderEditForm />
      </FsModal>
    </>
  );
}

export default Reminderhead;
