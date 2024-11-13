import Arrow from "../utils/Arrow";

function Income({ income, isLoading, isError }) {
  return (
    <div className="incomecard">
      <div className="incomefirsthead">
        <div className="incometext">Income</div>
        <Arrow color={"#00ba9d"} size="small" />
      </div>
      <div className="incomeamount">₹ {income}</div>
    </div>
  );
}
export default Income;
