"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setCapitalCurBranch,
  setCapitalIsEdit,
  setCapitalQuery,
  setCapitalSelectedDate,
  setCapitalType,
  setIsCapitalNewEntry,
  setResetCapitalDate,
} from "@/lib/slices/capitalSlice";
import CapitalNewEntryForms from "../../_Forms/_capitalForms/CapitalNewEntryForms";
import FsModal from "../../utils/FsModal";
import CapitalEditForms from "../../_Forms/_capitalForms/CapitalEditForm";
import Selector from "../../utils/Selector";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import DateModal from "../../utils/DateModal/DateModal";
import { dateOptions } from "@/app/data/generalDatas";
import { useState } from "react";
import apiClient from "@/lib/axiosInstance";
import { refreshCapital } from "@/app/_hooks/useCapital";
import toast from "react-hot-toast";

function Capitalhead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    startDate,
    endDate,
    curType,
    selectedDate,
    query,
  } = useSelector((state) => state.capital);

  const { branchNames } = useSelector((state) => state.general);

  const handleBranchChange = (e) => {
    dispatch(setCapitalCurBranch(e.target.value));
  };

  const handleSetStartDate = (date) => {
    dispatch(setCapitalSelectedDate("Custom"));
    dispatch(setCapitalStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setCapitalSelectedDate("Custom"));
    dispatch(setCapitalEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleTypeChange = (e) => {
    dispatch(setCapitalType(e.target.value));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setCapitalSelectedDate(range));
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
                  await apiClient.delete(`/capital/${id}`);
                  toast.success("Successfully Deleted");
                  refreshCapital();
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
    dispatch(setResetCapitalDate());
    dispatch(setCapitalSelectedDate("All"));
  };
  const handleSubmit = () => {
    setIsOpen(false);
  };

  const handleQuery = (e) => {
    dispatch(setCapitalQuery(e.target.value));
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsCapitalNewEntry(true))}>
            + New Entry
          </Button>
          <Button
            onClick={() => dispatch(setCapitalIsEdit(true))}
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
          />
          <Selector
            options={["All Type", "Fixed", "Temp"]}
            callback={handleTypeChange}
            curValue={curType}
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
                  onClick={() => dispatch(setCapitalSelectedDate(option))}
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsCapitalNewEntry}>
        <CapitalNewEntryForms />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setCapitalIsEdit}>
        <CapitalEditForms />
      </FsModal>
    </>
  );
}

export default Capitalhead;
