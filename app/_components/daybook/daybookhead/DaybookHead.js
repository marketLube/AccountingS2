"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import { FiDownload } from "react-icons/fi";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDaybookDates,
  setDaybookCurBank,
  setDaybookCurBranch,
  setDaybookCurCat,
  setDaybookCurParticular,
  setDayBookEndDate,
  setDaybookIsEdit,
  setDaybookQuery,
  setDayBookSelectedDate,
  setDaybookSelectedItems,
  setDayBookStartDate,
  setGstFileter,
  setIsDaybookNewEntri,
} from "@/lib/slices/daybookSlice";

import FsModal from "../../utils/FsModal";
import DaybookNewEntirForm from "../../_Forms/_daybookForms/DaybookNewEntirForm";
import DaybookEditForm from "../../_Forms/_daybookForms/DaybookEditForm";
import Selector from "../../utils/Selector";
import DateModal from "../../utils/DateModal/DateModal";
import MaterialDatePicker from "../../utils/DateModal/MateriealDatePicker";
import { dateOptions } from "@/app/data/generalDatas";
import { useState } from "react";
import toast from "react-hot-toast";
import Banktobank from "../../_Forms/BanktoBank/Banktobank";
import apiClient from "@/lib/axiosInstance";

function DaybookHead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curBank,
    curBranch,
    startDate,
    endDate,
    type,
    query,
    gstFilter,
    selectedDate,
  } = useSelector((state) => state.daybook);

  const [Bankopen, setBankopen] = useState(false);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setDaybookCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setDaybookCurParticular("All Particular"));
    dispatch(setDaybookCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setDaybookCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setDaybookCurBank(e.target.value));
  };

  const handleSetStartDate = (date) => {
    dispatch(setDayBookSelectedDate("Custom"));
    dispatch(setDayBookStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(setDayBookSelectedDate("Custom"));
    dispatch(setDayBookEndDate(date));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setDayBookSelectedDate(range));
  };

  // Date modal
  const [isOpen, setIsOpen] = useState(false);

  const handleDateModal = () => {
    setIsOpen((open) => !open);
  };

  const handleIsEdits = () => {
    if (!selectedItems?._id)
      return toast.error("Please Select a Transaction..!");
    dispatch(setDaybookIsEdit(true));
  };

  const handleClear = () => {
    dispatch(resetDaybookDates());
    dispatch(setDayBookSelectedDate("All"));
  };
  const handleSubmit = () => {
    setIsOpen(false);
  };

  const handleQuery = (e) => {
    dispatch(setDaybookQuery(e.target.value));
  };
  const handleGstChange = (e) => {
    dispatch(setGstFileter(e.target.value));
  };

  const handleExport = async () => {
    try {
      // Build query parameters
      const params = new URLSearchParams({
        startDate: startDate,
        endDate: endDate,
      });

      // Add filters if they're not "All"
      if (curBranch && !curBranch.startsWith("All")) {
        params.append("branch", curBranch);
      }
      if (curBank && !curBank.startsWith("All")) {
        params.append("bank", curBank);
      }
      if (curCat && !curCat.startsWith("All")) {
        params.append("catagory", curCat);
      }
      if (curParticular && !curParticular.startsWith("All")) {
        params.append("particular", curParticular);
      }
      if (query) {
        params.append("search", query);
      }
      if (gstFilter && gstFilter !== "All Type") {
        params.append("gst", gstFilter);
      }

      // Make API call to download Excel
      const response = await apiClient.get(
        `/transaction/download-excel?${params.toString()}`,
        {
          responseType: "blob",
        }
      );

      // Create blob and download
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `transaction-report-${startDate}-to-${endDate}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Excel report downloaded successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to download Excel report. Please try again.");
    }
  };

  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsDaybookNewEntri(true))}>
            + New Entry
          </Button>
          <Button onClick={() => setBankopen(true)}>+ Bank to Bank</Button>
          <Button
            onClick={handleIsEdits}
            type={selectedItems?._id ? "primary" : "secondary"}
          >
            Edit
          </Button>
        </>
        <>
          <Selector
            options={["All Type", "no-gst", "gst"]}
            callback={handleGstChange}
            curValue={gstFilter}
          />
          <Selector
            options={["All Categories", ...categoryNames]}
            callback={handleCatChange}
            curValue={curCat}
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
            curValue={curBranch}
          />
          <Selector
            options={["All Banks", ...bankNames]}
            callback={handlebankChange}
            curValue={curBank}
          />
          <Search query={query} handleQuery={handleQuery} />
          <Button type="filter" onClick={handleDateModal}>
            <GiSettingsKnobs />
          </Button>
          <Button
            onClick={handleExport}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FiDownload style={{ marginRight: "5px" }} />
            Export
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
                  onClick={() => dispatch(setDayBookSelectedDate(option))}
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
      <FsModal isOpen={Bankopen} setIsCancel={setBankopen} width="60vh">
        <Banktobank />
      </FsModal>

      <FsModal isOpen={isNewEntry} setIsCancel={setIsDaybookNewEntri}>
        <DaybookNewEntirForm />
      </FsModal>
      <FsModal
        isOpen={isEdit}
        setIsCancel={setDaybookIsEdit}
        callback={() => dispatch(setDaybookSelectedItems({}))}
      >
        <DaybookEditForm />
      </FsModal>
    </>
  );
}

export default DaybookHead;
