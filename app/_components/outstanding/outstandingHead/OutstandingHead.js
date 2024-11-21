import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "@/app/_components/utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOutstandingNewEntry,
  setOutCurStatus,
  setOutstandingCurBranch,
  setOutstandingCurCat,
  setOutstandingCurParticular,
  setOutstandingEndDate,
  setOutstandingIsEdit,
  setOutstandingSelectedDate,
  setOutstandingStartDate,
} from "@/lib/slices/outstandingSlice";
import FsModal from "../../utils/FsModal";
import OutstandingNewEntryForm from "../../_Forms/_outstandingForms/OutstandingNewEntryForm";
import OutstandingEditForm from "../../_Forms/_outstandingForms/OutstandingEditForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { dateOptions, liabilityStatus } from "@/app/data/generalDatas";
import { useState } from "react";

function OutstandingHead() {
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
  } = useSelector((state) => state.outstanding);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setOutstandingCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setOutstandingCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setOutstandingCurParticular(e.target.value));
  };

  const handleSetStartDate = (date) => {
    dispatch(setOutstandingStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setOutstandingEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleStatusChange = (e) => {
    dispatch(setOutCurStatus(e.target.value));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setOutstandingSelectedDate(range));
  };

  console.log(selectedItems, "Outstanding");

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsOutstandingNewEntry(true))}>
            + New Entri
          </Button>
          <Button
            onClick={() => dispatch(setOutstandingIsEdit(true))}
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsOutstandingNewEntry}>
        <OutstandingNewEntryForm />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setOutstandingIsEdit}>
        <OutstandingEditForm />
      </FsModal>
    </>
  );
}

export default OutstandingHead;
