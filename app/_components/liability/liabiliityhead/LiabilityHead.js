"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";
import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";

import {
  setIsLiabilityNewEntry,
  setLiabilityCurBranch,
  setLiabilityCurCat,
  setLiabilityCurParticular,
  setLiabilityEndDate,
  setLiabilityIsEdit,
  setLiabilitySelectedDate,
  setLiabilityStartDate,
  setLiabilityStatus,
  setResetLiabilityDate,
} from "@/lib/slices/liabilitySlice";

import LiabilityNewEntirForm from "../../_Forms/_liabilityForms/LiabilityNewEntirForm";
import FsModal from "../../utils/FsModal";
import LiabilityEditForm from "../../_Forms/_liabilityForms/LiabilityEditForm";
import Selector from "../../utils/Selector";
import { useState } from "react";
import DateModal from "../../utils/DateModal/DateModal";
import { dateOptions, liabilityStatus } from "@/app/data/generalDatas";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import apiClient from "@/lib/axiosInstance";
import { refreshLiability } from "@/app/_hooks/useLiability";
import toast from "react-hot-toast";

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
    setSelectedOption("Custom");
    dispatch(setLiabilityStartDate(date));
  };

  const handleSetEndDate = (date) => {
    setSelectedOption("Custom");
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

  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update local state
    dispatch(setLiabilitySelectedDate(option));
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const id = selectedItems?._id;
    try {
      setLoading(true);
      await apiClient.delete(`/liability/${id}`);
      toast.success("Successfully Liability Deleted");
      refreshLiability();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
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
          <Button
            onClick={onSubmit}
            type={selectedItems?._id ? "primary" : "secondary"}
            disabled={!selectedItems?._id}
          >
            Delete
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
            <Button
              type="clear"
              onClick={() => dispatch(setResetLiabilityDate())}
            >
              Clear
            </Button>
            <Button type="submit">Submit</Button>
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
