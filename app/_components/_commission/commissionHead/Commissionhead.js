"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import {
  setCommissionCurBank,
  setCommissionCurBranch,
  setCommissionCurCat,
  setCommissionCurParticular,
  setIsCommissionNewEntry,
} from "@/lib/slices/CommissionSlice";
import { useDispatch, useSelector } from "react-redux";
import FsModal from "../../utils/FsModal";
import CommissionNewEntryForm from "../../_Forms/_commissionForms/CommissionNewEntryForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import { dateOptions } from "@/app/data/generalDatas";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { useState } from "react";

function Commissionhead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    particulars,
    curCat,
    curParticular,
    curBank,
    startDate,
    endDate,
    selectedDate,
  } = useSelector((state) => state.commission);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setCommissionCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setCommissionCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setCommissionCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setCommissionCurBank(e.target.value));
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

  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    dispatch(setCommissionSelectedDate(option));
  };
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsCommissionNewEntry(true))}>
            + New Entri
          </Button>
          <Button type="secondary">Edit</Button>
        </>
        <>
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
        </div>
      </DateModal>

      <FsModal isOpen={isNewEntry} setIsCancel={setIsCommissionNewEntry}>
        <CommissionNewEntryForm />
      </FsModal>
    </>
  );
}

export default Commissionhead;
