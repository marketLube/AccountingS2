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
  setLiabilityQuery,
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
    selectedDate,
    query,
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
    dispatch(setLiabilitySelectedDate("Custom"));
    dispatch(setLiabilityStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setLiabilitySelectedDate("Custom"));
    dispatch(setLiabilityEndDate(date));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setLiabilitySelectedDate(range));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const id = selectedItems?._id;

    if (!id) {
      toast.error("No item selected to delete.");
      return;
    }

    // Show a confirmation toast
    toast(
      (t) => (
        <div>
          <p>
            Are you sure you want to delete this liability? This action cannot
            be undone.
          </p>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              gap: "8px",
            }}
          >
            <button
              className="btn dltprimary"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  setLoading(true);
                  await apiClient.delete(`/liability/${id}`);
                  toast.success("Successfully Liability Deleted");
                  refreshLiability();
                } catch (e) {
                  console.log(e);
                  toast.error(
                    e.response?.data?.message ||
                      "An error occurred while deleting."
                  );
                } finally {
                  setLoading(false);
                }
              }}
            >
              Confirm
            </button>
            <button
              className="btn secondary"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleClear = () => {
    dispatch(setResetLiabilityDate());
    dispatch(setLiabilitySelectedDate("All"));
  };
  const handleSubmit = () => {
    setIsOpen(false);
  };

  const handleQuery = (e) => {
    dispatch(setLiabilityQuery(e.target.value));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsLiabilityNewEntry(true))}>
            + New Entry
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
            type={selectedItems?._id ? "dltprimary" : "secondary"}
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
          <Search query={query} handleQuery={handleQuery} />
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
                  onClick={() => dispatch(setLiabilitySelectedDate(option))}
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
