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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsCommissionNewEntry}>
        <CommissionNewEntryForm />
      </FsModal>
    </>
  );
}

export default Commissionhead;
