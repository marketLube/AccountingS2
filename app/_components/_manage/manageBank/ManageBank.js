"use client";

import { useDispatch, useSelector } from "react-redux";
import ManageBankItem from "./ManageBankItem";
import { useState } from "react";
import ManageAdd from "./ManageAdd";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import apiClient from "@/lib/axiosInstance";
import { fetchBanks, fetchBranches } from "@/lib/slices/generalSlice";
import { ClipLoader } from "react-spinners";

function ManageBank({ type = "Bank" }) {
  const { banks } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [bankName, setBankName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setBankName(e.target.value);
  };

  const handleSaveBank = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.post("/bank", {
        name: bankName,
        balance: 0,
      });

      dispatch(fetchBanks());
      dispatch(fetchBranches());
      setIsAdding(false);
      setBankName("");
      toast.success("Successful");
    } catch (e) {
      console.log(e);
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
            placeholder="Add bank"
            value={bankName}
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

        {banks?.map((bank, i) => (
          <ManageBankItem bank={bank} key={i} />
        ))}
      </div>
      <div className="manage-box-container-footer">
        <ManageAdd onSetIsAdding={setIsAdding} isAdding={isAdding} />
      </div>
    </div>
  );
}

export default ManageBank;
