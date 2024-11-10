import { getCurrentMonthName } from "@/app/_services/helpers";

function Oustandingpay({ outstanding, isLoading, isError }) {
  return (
    <div className="outstandingcard">
      <div className="outstandingtext">Outstanding Peyments</div>
      <div className="outstandingamount">$ {outstanding}</div>
      <div className="outstandingoctober">{getCurrentMonthName()}</div>
    </div>
  );
}

export default Oustandingpay;
