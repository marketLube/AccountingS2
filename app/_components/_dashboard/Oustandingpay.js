import { formatWithCommas, getCurrentMonthName } from "@/app/_services/helpers";
import { useSelector } from "react-redux";

function Oustandingpay({ outstanding, isLoading, isError }) {
  const { isAllTime } = useSelector((state) => state.dashboard);
  const isNegative = outstanding < 0;
  return (
    <div className="outstandingcard">
      <div className="outstandingtext">Receivable Payments</div>
      <div className={`outstandingamount`}>
        {" "}
        {isNegative ? "-" : ""} ₹
        {formatWithCommas(Math.abs(outstanding)?.toFixed(2))}
      </div>
      <div className="outstandingoctober">
        {isAllTime ? "All time" : getCurrentMonthName()}
      </div>
    </div>
  );
}

export default Oustandingpay;
