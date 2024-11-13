import Arrow from "../utils/Arrow";

function Expense({ expense, isLoading, isError }) {
  return (
    <div className="expensecard">
      <div className="expensefirsthead">
        <div className="expensetext">Expense</div>

        <Arrow color={"#0040ff"} size="small" />
      </div>
      <div className="expenseamount">₹ {expense}</div>
    </div>
  );
}

export default Expense;
