"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import apiClient from "@/lib/axiosInstance";
import { fetchBanks, fetchBranches } from "@/lib/slices/generalSlice";
import { ClipLoader } from "react-spinners";
import ManageBranchItem from "./ManageBranchItem";
import ManageAddBranch from "./ManageAddBranch";

function ManageBranch({ type = "Branch" }) {
  const { branches } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [branchName, setbranchName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setbranchName(e.target.value);
  };

  const handleSaveBank = async () => {
    try {
      setIsLoading(true);
      await apiClient.post("/branch", {
        name: branchName,
        balance: 0,
      });
      dispatch(fetchBranches());
      setIsAdding(false);
      setbranchName("");
      toast.success("Successful");
    } catch (e) {
      toast.error("Duplicate Key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="manage-box-container">
      <div className="manage-box-container-head">{type}</div>
      <div className="manage-box-container-body">
        <div
          className="manage-box-container-body-item"
          style={
            isAdding
              ? { transform: "scaleY(1)", height: "3rem" }
              : { transform: "scaleY(0)", height: "0rem" }
          }
        >
          <input
            placeholder="Add Branch"
            value={branchName}
            onChange={handleOnChange}
          />
          <span className="manage-box-container-body-item-inputbtn">
            {!isLoading ? (
              <FaCheck
                color="green"
                style={{ cursor: "pointer" }}
                onClick={handleSaveBank}
              />
            ) : (
              <ClipLoader size={16} color="blue" />
            )}
          </span>
        </div>

        {branches?.map((branch, i) => (
          <ManageBranchItem branch={branch} key={i} />
        ))}
      </div>
      <div className="manage-box-container-footer">
        <ManageAddBranch onSetIsAdding={setIsAdding} isAdding={isAdding} />
      </div>
    </div>
  );
}

export default ManageBranch;
