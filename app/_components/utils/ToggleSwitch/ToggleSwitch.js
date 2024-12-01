"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ToggleSwitch.module.css";
import { setIsAllTime } from "@/lib/slices/dashboardSlice";

function ToggleSwitch() {
  const { isAllTime } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  return (
    <div>
      <input
        id="checkboxInput"
        className={styles.checkboxInput}
        checked={isAllTime}
        onChange={() => dispatch(setIsAllTime(!isAllTime))}
        type="checkbox"
      />
      <label className={styles.toggleSwitch} htmlFor="checkboxInput"></label>
    </div>
  );
}

export default ToggleSwitch;
