"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLiabilityNewEntry,
  setLiabilityCurBank,
  setLiabilityCurBranch,
  setLiabilityCurCat,
  setLiabilityCurParticular,
  setLiabilityEndDate,
  setLiabilityIsEdit,
  setLiabilitySelectedDate,
  setLiabilityStartDate,
  setLiabilityStatus,
} from "@/lib/slices/liabilitySlice";
import LiabilityNewEntirForm from "../../_Forms/_liabilityForms/LiabilityNewEntirForm";
import FsModal from "../../utils/FsModal";
import LiabilityEditForm from "../../_Forms/_liabilityForms/LiabilityEditForm";
import Selector from "../../utils/Selector";
import { useState } from "react";
import DateModal from "../../utils/DateModal/DateModal";
import { dateOptions, liabilityStatus } from "@/app/data/generalDatas";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";

function LiabilityHead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    startDate,
    endDate,
    curStatus,
  } = useSelector((state) => state.liability);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setLiabilityCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setLiabilityCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setLiabilityCurParticular(e.target.value));
  };

  const handleStatusChange = (e) => {
    dispatch(setLiabilityStatus(e.target.value));
  };

  const handleSetStartDate = (date) => {
    dispatch(setLiabilityStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setLiabilityEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setLiabilitySelectedDate(range));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsLiabilityNewEntry(true))}>
            + New Entri
          </Button>
          <Button
            onClick={() => dispatch(setLiabilityIsEdit(true))}
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
            options={["All Status", ...liabilityStatus]}
            callback={handleStatusChange}
            curValue={curStatus}
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsLiabilityNewEntry}>
        <LiabilityNewEntirForm />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setLiabilityIsEdit}>
        <LiabilityEditForm />
      </FsModal>
    </>
  );
}

export default LiabilityHead;
