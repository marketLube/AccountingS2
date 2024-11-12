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

function Reminderhead() {
  const dispatch = useDispatch();
  const { isNewEntry, selectedItems, isEdit } = useSelector(
    (state) => state.reminder
  );
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
