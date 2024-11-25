"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setCapitalCurBranch,
  setCapitalIsEdit,
  setCapitalType,
  setIsCapitalNewEntry,
  setResetCapitalDate,
} from "@/lib/slices/capitalSlice";
import CapitalNewEntryForms from "../../_Forms/_capitalForms/CapitalNewEntryForms";
import FsModal from "../../utils/FsModal";
import CapitalEditForms from "../../_Forms/_capitalForms/CapitalEditForm";
import Selector from "../../utils/Selector";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import DateModal from "../../utils/DateModal/DateModal";
import { dateOptions } from "@/app/data/generalDatas";
import { useState } from "react";

function Capitalhead() {
  const dispatch = useDispatch();
  const { isNewEntry, selectedItems, isEdit, startDate, endDate, curType } =
    useSelector((state) => state.capital);

  const { branchNames } = useSelector((state) => state.general);

  const handleBranchChange = (e) => {
    dispatch(setCapitalCurBranch(e.target.value));
  };

  const handleSetStartDate = (date) => {
    setSelectedOption("Custom");
    dispatch(setCapitalStartDate(date));
  };

  const handleSetEndDate = (date) => {
    setSelectedOption("Custom");
    dispatch(setCapitalEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleTypeChange = (e) => {
    dispatch(setCapitalType(e.target.value));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setCapitalSelectedDate(range));
  };

  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    dispatch(setCapitalSelectedDate(option));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsCapitalNewEntry(true))}>
            + New Entry
          </Button>
          <Button
            onClick={() => dispatch(setCapitalIsEdit(true))}
            type={selectedItems?._id ? "primary" : "secondary"}
            disabled={!selectedItems?._id}
          >
            Edit
          </Button>
        </>
        <>
          <Selector
            options={["All Branches", ...branchNames]}
            callback={handleBranchChange}
          />
          <Selector
            options={["All Type", "Fixed", "Temp"]}
            callback={handleTypeChange}
            curValue={curType}
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
          <div
            className="form-btn-group form-submit-btns"
            style={{ padding: "0 4rem" }}
          >
            <Button
              type="clear"
              onClick={() => dispatch(setResetCapitalDate())}
            >
              Clear
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </DateModal>

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
