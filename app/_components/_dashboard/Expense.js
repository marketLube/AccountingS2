import { formatWithCommas } from "@/app/_services/helpers";
import Arrow from "../utils/Arrow";

function Expense({ expense, isLoading, isError }) {
  const isNegative = expense < 0;
  return (
    <div className="expensecard">
      <div className="expensefirsthead">
        <div className="expensetext">Expense</div>

        <Arrow color="#0040ff" size="small" isDown={true} />
      </div>
      <div className={`expenseamount`}>
        {isNegative ? "-" : ""} ₹{formatWithCommas(Math.abs(expense))}
      </div>
    </div>
  );
}

export default Expense;
