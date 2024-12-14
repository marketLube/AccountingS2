"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import {
  setCommissionCurBranch,
  setIsCommissionNewEntry,
  setResetCommissionDate,
  setCommissionIsEdit,
  setCommissionSelectedItems,
  setCommissionSelectedDate,
  setCommitionStatus,
} from "@/lib/slices/CommissionSlice";
import { useDispatch, useSelector } from "react-redux";
import FsModal from "../../utils/FsModal";
import CommissionNewEntryForm from "../../_Forms/_commissionForms/CommissionNewEntryForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import { dateOptions } from "@/app/data/generalDatas";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { useState } from "react";
import CommissionEditForm from "../../_Forms/_commissionForms/CommissionEditForm";
import toast from "react-hot-toast";
import apiClient from "@/lib/axiosInstance";

function Commissionhead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    startDate,
    selectedItems,
    endDate,
    isEdit,
    query,
    curStatus,
    curBranch,
    selectedDate,
  } = useSelector((state) => state.commission);

  const { branchNames } = useSelector((state) => state.general);

  const handleBranchChange = (e) => {
    dispatch(setCommissionCurBranch(e.target.value));
  };

  const handleSetStartDate = (date) => {
    setSelectedOption("Custom");
    dispatch(setReminderStartDate(date));
  };

  const handleSetEndDate = (date) => {
    setSelectedOption("Custom");
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
    dispatch(setCommissionSelectedDate(option));
  };

  const [loading, setLoading] = useState(false);

  const handleStatusChange = (e) => {
    dispatch(setCommitionStatus(e.target.value));
  };

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
                  await apiClient.delete(`/university/${id}`);
                  toast.success("Successfully Deleted");
                  dispatch(setCommissionSelectedItems({}));
                } catch (e) {
                  console.log(e);
                  toast?.error(
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
    dispatch(setResetCommissionDate());
    dispatch(setCommissionSelectedDate("All"));
  };
  const handleSubmit = () => {
    setIsOpen(false);
  };
  const handleQuery = (e) => {
    dispatch(setAssetsQuery(e.target.value));
  };
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsCommissionNewEntry(true))}>
            + New Entry
          </Button>
          <Button
            onClick={() => dispatch(setCommissionIsEdit(true))}
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
        </>

        <>
          <Selector
            options={["All Branches", ...branchNames]}
            callback={handleBranchChange}
            curValue={curBranch}
          />
          <Selector
            options={[
              "All Status",
              "Invoice Shared",
              "Mail Pending",
              "Received",
              "Pending",
            ]}
            callback={handleStatusChange}
            curValue={curStatus}
          />
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
              ].map((option) => (
                <li
                  key={option}
                  onClick={() => handleOptionClick(option)}
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsCommissionNewEntry}>
        <CommissionNewEntryForm />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setCommissionIsEdit}>
        <CommissionEditForm />
      </FsModal>
    </>
  );
}

export default Commissionhead;
