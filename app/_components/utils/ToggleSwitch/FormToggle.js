"use client";
import { useEffect, useState } from "react";
import "./FormToggle.css";

function FormToggle({ isBalanceEffect, setIsBalanceEffect }) {
  return (
    <div class="cl-toggle-switch">
      <label class="cl-switch">
        <input
          type="checkbox"
          checked={isBalanceEffect}
          onChange={() => setIsBalanceEffect(!isBalanceEffect)}
        />
        <span></span>
      </label>
    </div>
  );
}

export default FormToggle;
