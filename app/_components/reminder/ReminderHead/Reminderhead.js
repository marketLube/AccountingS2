"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsReminderNewEntry,
  setReminderCurBranch,
  setReminderCurCat,
  setReminderCurParticular,
  setReminderCurStatus,
  setReminderEndDate,
  setReminderIsEdit,
  setReminderQuery,
  setReminderSelectedDate,
  setReminderSelectedItems,
  setReminderStartDate,
  setResetReminderDate,
} from "@/lib/slices/reminderSlice";
import FsModal from "../../utils/FsModal";
import ReminderNewEntryForm from "../../_Forms/_reminderForms/ReminderNewEntryForm";
import ReminderEditForm from "../../_Forms/_reminderForms/ReminderEditForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { dateOptions, liabilityStatus } from "@/app/data/generalDatas";
import { useState } from "react";
import apiClient from "@/lib/axiosInstance";
import toast from "react-hot-toast";
import { refreshReminders } from "@/app/_hooks/useReminders";

function Reminderhead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curStatus,
    startDate,
    endDate,
    selectedDate,
    query,
  } = useSelector((state) => state.reminder);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setReminderCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setReminderCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setReminderCurParticular(e.target.value));
  };

  const handleSetStartDate = (date) => {
    dispatch(setReminderSelectedDate("Custom"));
    dispatch(setReminderStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setReminderSelectedDate("Custom"));
    dispatch(setReminderEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleStatusChange = (e) => {
    dispatch(setReminderCurStatus(e.target.value));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setReminderSelectedDate(range));
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const id = selectedItems?._id;

    if (!id) {
      toast.error("No item selected to delete.");
      return;
    }

    toast(
      (t) => (
        <div>
          <p>This action cannot be undone.</p>
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
                  await apiClient.delete(`/reminders/${id}`);
                  toast.success("Successfully Deleted");
                  refreshReminders();
                  dispatch(setReminderSelectedItems({}));
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
    dispatch(setResetReminderDate());
    dispatch(setReminderSelectedDate("All"));
  };
  const handleSubmit = () => {
    setIsOpen(false);
  };

  const handleQuery = (e) => {
    dispatch(setReminderQuery(e.target.value));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsReminderNewEntry(true))}>
            + New Entry
          </Button>
          <Button
            onClick={() => dispatch(setReminderIsEdit(true))}
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
            options={["All Status", ...liabilityStatus]}
            callback={handleStatusChange}
            curValue={curStatus}
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
                  onClick={() => dispatch(setReminderSelectedDate(option))}
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsReminderNewEntry}>
        <ReminderNewEntryForm />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setReminderIsEdit}>
        <ReminderEditForm />
      </FsModal>
    </>
  );
}

export default Reminderhead;
