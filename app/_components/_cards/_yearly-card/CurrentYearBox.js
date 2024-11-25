import {
  formatWithCommas,
  getCurrentMonthName,
  thisYear,
} from "@/app/_services/helpers";
import CurrentYearCard from "./CurrentYearCard";
import { useSelector } from "react-redux";

function CurrentYearBox({
  totals = { totalCredit: 80, totalDebit: 90 },
  label,
}) {
  const { totalCredit, totalDebit } = totals;
  const { isAllTime } = useSelector((state) => state.dashboard);

  // Compute the profit/loss text dynamically
  const text =
    label ||
    (isAllTime ? "All time Profit" : `Profit in ${getCurrentMonthName()}`);
  const profitAmount = totalCredit - totalDebit;
  const isNegative = profitAmount < 0;

  return (
    <div className="current-year-box">
      <CurrentYearCard dataset={[totalCredit, totalDebit]} />
      <div className="current-year-box-text">
        <h4 className="topperformerhead">{text}</h4>
        <h2 className={`text-small-bold`}>
          {isNegative ? "-" : ""} ₹{formatWithCommas(Math.abs(profitAmount))}
        </h2>
      </div>
    </div>
  );
}
export default CurrentYearBox;
