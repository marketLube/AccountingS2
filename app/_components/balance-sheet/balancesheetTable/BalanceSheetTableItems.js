import { formatWithCommas, truncate } from "@/app/_services/helpers";

function BalanceSheetTableItems({ item }) {
  const isNegative = item?.profit < 0;
  return (
    <div className="table-col">
      {/* <span className="table-check" style={{ opacity: "0" }}></span> */}
      <span className="table-col month table-body-col">{item?.month}</span>
      <span className="table-col income table-body-col">
        {formatWithCommas(item?.income?.toFixed(2))}
      </span>
      <span className="table-col expanse table-body-col">
        {formatWithCommas(item?.expense?.toFixed(2))}
      </span>
      <span className="table-col liability table-body-col">
        {formatWithCommas(item?.liability?.toFixed(2))}
      </span>
      <span className="table-col outstanding table-body-col">
        {formatWithCommas(item?.outstanding?.toFixed(2))}
      </span>
      <span
        className="table-col profit table-body-col"
        style={isNegative ? { color: "red" } : {}}
      >
        {formatWithCommas(item?.profit?.toFixed(2))}
      </span>
    </div>
  );
}

export default BalanceSheetTableItems;
