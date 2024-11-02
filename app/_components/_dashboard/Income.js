import Arrow from "../utils/Arrow";

function Income() {
  return (
    <div>
      <div className="incomecard">
        <div className="incomefirsthead">
          <div className="incometext">Income</div>
          <div>
            <Arrow color={"#00ba9d"} size="small" />
          </div>
        </div>
        <div className="incomeamount">$ 12,33,87,775,89</div>
      </div>
    </div>
  );
}

export default Income;
