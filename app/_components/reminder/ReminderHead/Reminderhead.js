"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { setIsReminderNewEntry } from "@/lib/slices/reminderSlice";
import FsModal from "../../utils/FsModal";
import ReminderNewEntryForm from "../../_Forms/_reminderForms/ReminderNewEntryForm";

function Reminderhead() {
  const dispatch = useDispatch();
  const { isNewEntry } = useSelector((state) => state.reminder);
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsReminderNewEntry(true))}>
            + New Entri
          </Button>
          <Button type="secondary">Edit</Button>
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
    </>
  );
}

export default Reminderhead;
