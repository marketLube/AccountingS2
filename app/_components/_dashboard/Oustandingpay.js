import { getCurrentMonthName } from "@/app/_services/helpers";
import { useSelector } from "react-redux";

function Oustandingpay({ outstanding, isLoading, isError }) {
  const { isAllTime } = useSelector((state) => state.dashboard);
  return (
    <div className="outstandingcard">
      <div className="outstandingtext">Outstanding Peyments</div>
      <div
        className={`outstandingamount ${
          outstanding < 0 ? "negativeamount" : ""
        }`}
      >
        ₹ {outstanding}
      </div>
      <div className="outstandingoctober">
        {isAllTime ? "All time" : getCurrentMonthName()}
      </div>
    </div>
  );
}

export default Oustandingpay;
