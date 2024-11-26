import { formatWithCommas } from "@/app/_services/helpers";
import Arrow from "../utils/Arrow";

function Income({ income, isLoading, isError }) {
  const isNegative = income < 0;
  return (
    <div className="incomecard">
      <div className="incomefirsthead">
        <div className="incometext">Income</div>
        <Arrow color={"#00ba9d"} size="small" />
      </div>
      <div className={`incomeamount`}>
        {isNegative ? "-" : ""} ₹
        {formatWithCommas(Math.abs(income)?.toFixed(2))}
      </div>
    </div>
  );
}
export default Income;
//
