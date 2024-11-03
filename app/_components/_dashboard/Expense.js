import Arrow from "../utils/Arrow";
function Expense() {
  return (
    <div>
      <div className="expensecard">
        <div className="expensefirsthead">
          <div className="expensetext">Expense</div>
          <div>
            <Arrow color={"#0040ff"} size="small" />
          </div>
        </div>
        <div className="expenseamount">$ 12,33,875,89</div>
      </div>
    </div>
  );
}

export default Expense;