import { getCurrentMonthName, thisYear } from "@/app/_services/helpers";
import CurrentYearCard from "./CurrentYearCard";
import { useSelector } from "react-redux";

function CurrentYearBox({ totals }) {
  const { totalCredit, totalDebit } = totals || {
    totalCredit: "--",
    totalDebit: "--",
  };

  const { isAllTime } = useSelector((state) => state.dashboard);

  return (
    <div className="current-year-box">
      <CurrentYearCard dataset={[totalCredit, totalDebit]} />
      <div className="current-year-box-text">
        <h4 className="topperformerhead">
          {isAllTime ? "All time Profit" : "Profit in " + getCurrentMonthName()}
        </h4>
        <h2 className="text-small-bold">$ {totalCredit - totalDebit}</h2>
      </div>
    </div>
  );
}

export default CurrentYearBox;
