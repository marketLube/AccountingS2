"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setLedgerCurBranch,
  setLedgerCurCat,
  setLedgerSelectedDate,
  setResetLedgerDate,
} from "@/lib/slices/ledgerSlice";
import Selector from "../../utils/Selector";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { dateOptions } from "@/app/data/generalDatas";
import DateModal from "../../utils/DateModal/DateModal";
import { useState } from "react";

function LedgerHead() {
  const dispatch = useDispatch();
  const { curCat, startDate, endDate, selectedDate } = useSelector(
    (state) => state.ledger
  );

  const { categoryNames } = useSelector((state) => state.general);

  const handleCatChange = (e) => {
    dispatch(setLedgerCurCat(e.target.value));
  };

  const handleSetStartDate = (date) => {
    dispatch(setLedgerSelectedDate("Custom"));
    dispatch(setReminderStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setLedgerSelectedDate("Custom"));
    dispatch(setReminderEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setReminderSelectedDate(range));
  };

  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    dispatch(setLedgerSelectedDate(option));
  };

  const handleClear = () => {
    dispatch(setResetLedgerDate());
    dispatch(setLedgerSelectedDate("All"));
  };
  const handleSubmit = () => {
    setIsOpen(false);
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button type="secondary" style={{ opacity: "0" }}>
            Edit
          </Button>
        </>
        <>
          <Selector
            options={["All Categories", ...categoryNames]}
            callback={handleCatChange}
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
              {dateOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => dispatch(setLedgerSelectedDate(option))}
                  className={selectedDate === option ? "selected" : ""}
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
            <Button type="clear" onClick={handleClear}>
              Clear
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </DateModal>
    </>
  );
}

export default LedgerHead;
