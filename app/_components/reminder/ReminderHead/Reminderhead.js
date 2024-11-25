"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsReminderNewEntry,
  setReminderCurBranch,
  setReminderCurCat,
  setReminderCurParticular,
  setReminderCurStatus,
  setReminderEndDate,
  setReminderIsEdit,
  setReminderSelectedDate,
  setReminderStartDate,
  setResetReminderDate,
} from "@/lib/slices/reminderSlice";
import FsModal from "../../utils/FsModal";
import ReminderNewEntryForm from "../../_Forms/_reminderForms/ReminderNewEntryForm";
import ReminderEditForm from "../../_Forms/_reminderForms/ReminderEditForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { dateOptions, liabilityStatus } from "@/app/data/generalDatas";
import { useState } from "react";

function Reminderhead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curStatus,
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

  const handleSetStartDate = (date) => {
    setSelectedOption("Custom");
    dispatch(setReminderStartDate(date));
  };

  const handleSetEndDate = (date) => {
    setSelectedOption("Custom");
    dispatch(setReminderEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleStatusChange = (e) => {
    dispatch(setReminderCurStatus(e.target.value));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setReminderSelectedDate(range));
  };

  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    dispatch(setReminderSelectedDate(option));
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
            disabled={!selectedItems?._id}
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
            options={["All Status", ...liabilityStatus]}
            callback={handleStatusChange}
            curValue={curStatus}
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
              {[
                "All",
                "Today",
                "Yesterday",
                "Last 30 Days",
                "Last 60 Days",
                "Custom",
              ].map((option) => (
                <li
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={selectedOption === option ? "selected" : ""}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="form-btn-group form-submit-btns"
            style={{ padding: "0 4rem" }}
          >
            <Button
              type="clear"
              onClick={() => dispatch(setResetReminderDate())}
            >
              Clear
            </Button>
            <Button type="submit">Submit</Button>
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
