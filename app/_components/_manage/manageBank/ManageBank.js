"use client";

import { useSelector } from "react-redux";
import Button from "../../utils/Button";
import ManageBankItem from "./ManageBankItem";
import { useState } from "react";
import ManageAdd from "./ManageAdd";
import { FaCheck } from "react-icons/fa";

function ManageBank({ type = "Bank" }) {
  const { banks } = useSelector((state) => state.general);
  const [isAdding, setIsAdding] = useState(false);

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
          <input placeholder="Add bank" />
          <span className="manage-box-container-body-item-inputbtn">
            <FaCheck color="green" style={{ cursor: "pointer" }} />
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
