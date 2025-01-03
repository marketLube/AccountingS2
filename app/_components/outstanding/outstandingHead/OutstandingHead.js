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
  setOutstandingQuery,
  setOutstandingSelectedDate,
  setOutstandingStartDate,
  setResetOutstandingyDate,
} from "@/lib/slices/outstandingSlice";
import FsModal from "../../utils/FsModal";
import OutstandingNewEntryForm from "../../_Forms/_outstandingForms/OutstandingNewEntryForm";
import OutstandingEditForm from "../../_Forms/_outstandingForms/OutstandingEditForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { dateOptions, liabilityStatus } from "@/app/data/generalDatas";
import { useState } from "react";
import { refreshOutstanding } from "@/app/_hooks/useOutstanding";
import apiClient from "@/lib/axiosInstance";
import toast from "react-hot-toast";

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
    selectedDate,
    query,
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
    dispatch(setOutstandingSelectedDate("Custom"));
    dispatch(setOutstandingStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setOutstandingSelectedDate("Custom"));
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
          <p>
            Are you sure you want to delete this Outstanding? This action cannot
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
                  toast.success("Successfully Deleted");
                  refreshOutstanding();
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
    dispatch(setResetOutstandingyDate());
    dispatch(setOutstandingSelectedDate("All"));
  };
  const handleSubmit = () => {
    setIsOpen(false);
  };

  const handleQuery = (e) => {
    dispatch(setOutstandingQuery(e.target.value));
  };
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsOutstandingNewEntry(true))}>
            + New Entry
          </Button>
          <Button
            onClick={() => dispatch(setOutstandingIsEdit(true))}
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
                  onClick={() => dispatch(setOutstandingSelectedDate(option))}
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
