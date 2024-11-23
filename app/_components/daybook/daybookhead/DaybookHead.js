"use client";

import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setDaybookCurBank,
  setDaybookCurBranch,
  setDaybookCurCat,
  setDaybookCurParticular,
  setDayBookEndDate,
  setDaybookIsEdit,
  setDayBookSelectedDate,
  setDaybookSelectedItems,
  setDayBookStartDate,
  setIsDaybookNewEntri,
} from "@/lib/slices/daybookSlice";

import FsModal from "../../utils/FsModal";
import DaybookNewEntirForm from "../../_Forms/_daybookForms/DaybookNewEntirForm";
import DaybookEditForm from "../../_Forms/_daybookForms/DaybookEditForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { dateOptions } from "@/app/data/generalDatas";
import { useState } from "react";
import toast from "react-hot-toast";
import Banktobank from "../../_Forms/BanktoBank/Banktobank";

function DaybookHead() {
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
  } = useSelector((state) => state.daybook);

  const [Bankopen, setBankopen] = useState(false);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setDaybookCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setDaybookCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setDaybookCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setDaybookCurBank(e.target.value));
  };

  const handleSetStartDate = (date) => {
    dispatch(setDayBookStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setDayBookEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setDayBookSelectedDate(range));
  };

  const handleIsEdits = () => {
    if (!selectedItems?._id)
      return toast.error("Please Select a Transaction..!");
    dispatch(setDaybookIsEdit(true));
  };

  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    dispatch(setDayBookSelectedDate(option));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsDaybookNewEntri(true))}>
            + New Entry
          </Button>
          <Button onClick={() => setBankopen(true)}>+ Bank to Bank</Button>
          <Button
            onClick={handleIsEdits}
            type={selectedItems?._id ? "primary" : "secondary"}
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
            <Button type="submit">Submit</Button>
            <Button type="clear">Clear</Button>
          </div>
        </div>
      </DateModal>
      <FsModal isOpen={Bankopen} setIsCancel={setBankopen} width="60vh">
        <Banktobank />
      </FsModal>

      <FsModal isOpen={isNewEntry} setIsCancel={setIsDaybookNewEntri}>
        <DaybookNewEntirForm />
      </FsModal>
      <FsModal
        isOpen={isEdit}
        setIsCancel={setDaybookIsEdit}
        callback={() => dispatch(setDaybookSelectedItems({}))}
      >
        <DaybookEditForm />
      </FsModal>
    </>
  );
}

export default DaybookHead;
