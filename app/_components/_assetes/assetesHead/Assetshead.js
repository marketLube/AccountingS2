"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setAssetsCurBranch,
  setAssetsEndDate,
  setAssetsIsEdit,
  setAssetsQuery,
  setAssetsSelectedDate,
  setAssetsStartDate,
  setAssetsType,
  setIsAssetsNewEntry,
  setResetAssetDate,
} from "@/lib/slices/assetsSlice";
import FsModal from "../../utils/FsModal";
import AssetesNewEntryForms from "../../_Forms/_assetesForms/AssetesNewEntryForms";
import AssetesEditForms from "../../_Forms/_assetesForms/AssetesEditForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import { dateOptions } from "@/app/data/generalDatas";
import { useState } from "react";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { refreshAssets } from "@/app/_hooks/useAssets";
import toast from "react-hot-toast";
import apiClient from "@/lib/axiosInstance";

function Assetshead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    curType,
    curBranch,
    startDate,
    endDate,
    selectedDate,
    query,
  } = useSelector((state) => state.assets);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setAssetsCurBranch(e.target.value));
  };
  const handleSetStartDate = (date) => {
    dispatch(setAssetsSelectedDate("Custom"));
    dispatch(setAssetsStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setAssetsSelectedDate("Custom"));
    dispatch(setAssetsEndDate(date));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };
  const handleTypeChange = (e) => {
    dispatch(setAssetsType(e.target.value));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setAssetsSelectedDate(range));
  };

  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    dispatch(setAssetsSelectedDate(option));
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
                  await apiClient.delete(`/assets/${id}`);
                  toast.success("Successfully Deleted");
                  refreshAssets();
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
    dispatch(setResetAssetDate());
    dispatch(setAssetsSelectedDate("All"));
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
          <Button onClick={() => dispatch(setIsAssetsNewEntry(true))}>
            + New Entry
          </Button>
          <Button
            onClick={() => dispatch(setAssetsIsEdit(true))}
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
                  onClick={() => dispatch(setAssetsSelectedDate(option))}
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsAssetsNewEntry}>
        <AssetesNewEntryForms />
      </FsModal>
      <FsModal isOpen={isEdit} setIsCancel={setAssetsIsEdit}>
        <AssetesEditForms />
      </FsModal>
    </>
  );
}

export default Assetshead;
