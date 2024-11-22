"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setAssetsCurBranch,
  setAssetsEndDate,
  setAssetsIsEdit,
  setAssetsSelectedDate,
  setAssetsStartDate,
  setAssetsType,
  setIsAssetsNewEntry,
} from "@/lib/slices/assetsSlice";
import FsModal from "../../utils/FsModal";
import AssetesNewEntryForms from "../../_Forms/_assetesForms/AssetesNewEntryForms";
import AssetesEditForms from "../../_Forms/_assetesForms/AssetesEditForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import { dateOptions } from "@/app/data/generalDatas";
import { useState } from "react";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";

function Assetshead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    curType,
    curBranch,
    startDate,
    endDate,
    selectedDate,
  } = useSelector((state) => state.assets);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setAssetsCurBranch(e.target.value));
  };
  const handleSetStartDate = (date) => {
    dispatch(setAssetsStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setAssetsEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };
  const handleTypeChange = (e) => {
    dispatch(setAssetsType(e.target.value));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setAssetsSelectedDate(range));
  };

  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    dispatch(setAssetsSelectedDate(option));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsAssetsNewEntry(true))}>
            + New Entri
          </Button>
          <Button
            onClick={() => dispatch(setAssetsIsEdit(true))}
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
            curValue={curBranch}
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
            <Button type="submit">Submit</Button>
            <Button type="clear">Clear</Button>
          </div>
        </div>
      </DateModal>

      <FsModal isOpen={isNewEntry} setIsCancel={setIsAssetsNewEntry}>
        <AssetesNewEntryForms />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setAssetsIsEdit}>
        <AssetesEditForms />
      </FsModal>
    </>
  );
}

export default Assetshead;
