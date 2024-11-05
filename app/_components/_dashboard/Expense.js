import Arrow from "../utils/Arrow";
function Expense() {
  return (
    <div className="expensecard">
      <div className="expensefirsthead">
        <div className="expensetext">Expense</div>

        <Arrow color={"#0040ff"} size="small" />
      </div>
      <div className="expenseamount">$ 12,33,875,89</div>
    </div>
  );
}

export default Expense;
