"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import {
  setBudgetplannerCurBank,
  setBudgetplannerCurBranch,
  setBudgetplannerCurCat,
  setBudgetplannerCurParticular,
  setBudgetplannerEndDate,
  setBudgetplannerIsEdit,
  setBudgetplannerSelectedDate,
  setBudgetplannerSelectedItems,
  setBudgetplannerStartDate,
  setBudgetQuery,
  setCurRange,
  setIsBudgetplannerNewEntry,
  setResetBudgetDate,
} from "@/lib/slices/budgetplannerSlice";
import { useDispatch, useSelector } from "react-redux";
import FsModal from "../../utils/FsModal";
import BudgetplannerNewEntryForm from "../../_Forms/_budgetplannerForms/BudgetplannerNewEntryForm";
import BudgetplannerEditForm from "../../_Forms/_budgetplannerForms/BudgetplannerEditForm";
import Selector from "../../utils/Selector";
import { useState } from "react";
import DateModal from "../../utils/DateModal/DateModal";
import { dateOptions } from "@/app/data/generalDatas";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { refreshBudgetPlanner } from "@/app/_hooks/useBudgetPlanner";
import apiClient from "@/lib/axiosInstance";
import toast from "react-hot-toast";

function Budgetplannerhead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    curBranch,
    startDate,
    endDate,
    curRange,
    selectedDate,
    query,
  } = useSelector((state) => state.budgetplanner);

  const { branchNames } = useSelector((state) => state.general);

  const handleBranchChange = (e) => {
    dispatch(setBudgetplannerCurBranch(e.target.value));
  };

  const handleSetStartDate = (date) => {
    dispatch(setBudgetplannerSelectedDate("Custom"));
    dispatch(setBudgetplannerStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setBudgetplannerSelectedDate("Custom"));
    dispatch(setBudgetplannerEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setBudgetplannerSelectedDate(range));
  };

  const handleRangeChange = (e) => {
    dispatch(setCurRange(e.target.value));
  };

  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    dispatch(setBudgetplannerSelectedDate(option));
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
                  await apiClient.delete(`/event/${id}`);
                  toast.success("Successfully Deleted");
                  refreshBudgetPlanner();
                  dispatch(setBudgetplannerSelectedItems({}));
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
    dispatch(setResetBudgetDate());
    dispatch(setBudgetplannerSelectedDate("All"));
  };
  const handleSubmit = () => {
    setIsOpen(false);
  };

  const handleQuery = (e) => {
    dispatch(setBudgetQuery(e.target.value));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsBudgetplannerNewEntry(true))}>
            + New Entry
          </Button>
          <Button
            onClick={() => dispatch(setBudgetplannerIsEdit(true))}
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
        </>
        <>
          <Selector
            options={["One Month", "Three Months", "Six Months"]}
            callback={handleRangeChange}
            curValue={curRange}
          />
          <Selector
            options={["All Branches", ...branchNames]}
            callback={handleBranchChange}
            curValue={curBranch}
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsBudgetplannerNewEntry}>
        <BudgetplannerNewEntryForm />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setBudgetplannerIsEdit}>
        <BudgetplannerEditForm />
      </FsModal>
    </>
  );
}

export default Budgetplannerhead;
