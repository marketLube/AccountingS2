"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsReminderNewEntry,
  setReminderEndDate,
  setReminderIsEdit,
  setReminderSelectedDate,
  setReminderStartDate,
} from "@/lib/slices/reminderSlice";
import FsModal from "../../utils/FsModal";
import ReminderNewEntryForm from "../../_Forms/_reminderForms/ReminderNewEntryForm";
import ReminderEditForm from "../../_Forms/_reminderForms/ReminderEditForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { dateOptions } from "@/app/data/generalDatas";

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
    startDate,
    endDate,
    selectedDate,
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

  const handleSetStartDate = (date) => {
    dispatch(setReminderStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setReminderEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleSelectChange = (range) => {
    console.log(range, "select");
    return () => dispatch(setReminderSelectedDate(range));
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
          <Button type="filter" onClick={handleDateModal}>
            <GiSettingsKnobs />
          </Button>
        </>
      </LayoutHead>

      <DateModal
        dateOptions={dateOptions}
        isOpen={isOpen}
        handleDateModal={handleDateModal}
        handleSelectChange={handleSelectChange}
      >
        <div className="date_container">
          <div className="date_popup_selector">
            <MaterialDatePicker
              date={startDate}
              setDate={handleSetStartDate}
              label={"Select Start Date"}
            />
          </div>
          <div className="date_popup_selector">
            <MaterialDatePicker
              date={endDate}
              setDate={handleSetEndDate}
              label={"Select End Date"}
            />
          </div>
          <div className="date_custom">
            <ul>
              <li onClick={handleSelectChange("All")}>All</li>
              <li onClick={handleSelectChange("Today")}>Today</li>
              <li onClick={handleSelectChange("Yesterday")}>Yesterday</li>
              <li onClick={handleSelectChange("Last 30 Days")}>Last 30 Days</li>
              <li onClick={handleSelectChange("Last 60 Days")}>Last 60 Days</li>
            </ul>
          </div>
        </div>
      </DateModal>

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
