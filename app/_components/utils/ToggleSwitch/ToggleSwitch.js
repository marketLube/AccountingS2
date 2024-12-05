"use client";
import { useDispatch, useSelector } from "react-redux";
import "./ToggleSwitch.css";
import { setIsAllTime } from "@/lib/slices/dashboardSlice";

function ToggleSwitch() {
  const { isAllTime } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  return (
    <label class="toggle-switch">
      <input
        type="checkbox"
        checked={isAllTime}
        onChange={(e) => dispatch(setIsAllTime(!isAllTime))}
      />
      <div class="toggle-switch-background">
        <div class="toggle-switch-handle"></div>
      </div>
    </label>
  );
}

export default ToggleSwitch;
