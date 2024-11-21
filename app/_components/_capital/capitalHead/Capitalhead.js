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
    dispatch(setCapitalStartDate(date));
  };

  const handleSetEndDate = (date) => {
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

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsCapitalNewEntry(true))}>
            + New Entri
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
              <li onClick={handleSelectChange("All")}>All</li>
              <li onClick={handleSelectChange("Today")}>Today</li>
              <li onClick={handleSelectChange("Yesterday")}>Yesterday</li>
              <li onClick={handleSelectChange("Last 30 Days")}>Last 30 Days</li>
              <li onClick={handleSelectChange("Last 60 Days")}>Last 60 Days</li>
            </ul>
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
