"use client";

import BlueButton from "../_Forms/_FormComponents/BlueButton";

function ManageBranch() {
  return (
    <div className="manage-box-container">
      <div className="header-bank">
        <h2>Banks</h2>
      </div>
      <div className="banks-list">
        {["RBL", "ICICI", "RAK", "HDFC", "Bandan"].map((bank, index) => (
          <div key={index} className="bank-item">
            {bank}
            <label className="branch-switch">
              <input type="checkbox" checked />
              <span className="branch-slider"></span>
            </label>
          </div>
        ))}
      </div>
      <div className="bank-button ">
        <BlueButton />
        <BlueButton />
      </div>
    </div>
  );
}

export default ManageBranch;
