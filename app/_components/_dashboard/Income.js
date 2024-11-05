import Arrow from "../utils/Arrow";

function Income() {
  return (
    <div className="incomecard">
      <div className="incomefirsthead">
        <div className="incometext">Income</div>
        <Arrow color={"#00ba9d"} size="small" />
      </div>
      <div className="incomeamount">$ 12,33,87,89</div>
    </div>
  );
}
export default Income;
