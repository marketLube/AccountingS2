"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setLedgerCurBank,
  setLedgerCurBranch,
  setLedgerCurCat,
  setLedgerCurParticular,
} from "@/lib/slices/ledgerSlice";
import Selector from "../../utils/Selector";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { dateOptions } from "@/app/data/generalDatas";
import DateModal from "../../utils/DateModal/DateModal";
import { useState } from "react";

function LedgerHead() {
  const dispatch = useDispatch();
  const {
    particulars,
    curCat,
    curParticular,
    curBank,
    startDate,
    endDate,
    selectedDate,
  } = useSelector((state) => state.ledger);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setLedgerCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setLedgerCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setLedgerCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setLedgerCurBank(e.target.value));
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
          <Button type="secondary">Edit</Button>
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
    </>
  );
}

export default LedgerHead;
