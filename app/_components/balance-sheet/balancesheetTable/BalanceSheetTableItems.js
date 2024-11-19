import { truncate } from "@/app/_services/helpers";

function BalanceSheetTableItems({ item }) {
  return (
    <div className="table-col">
      {/* <span className="table-check" style={{ opacity: "0" }}></span> */}
      <span className="table-col month table-body-col">{item?.month}</span>
      <span className="table-col income table-body-col">
        {item?.income?.toFixed(2)}
      </span>
      <span className="table-col expanse table-body-col">
        {item?.expense?.toFixed(2)}
      </span>
      <span className="table-col liability table-body-col">
        {item?.liability?.toFixed(2)}
      </span>
      <span className="table-col outstanding table-body-col">
        {item?.outstanding?.toFixed(2)}
      </span>
      <span className="table-col profit table-body-col">
        {item?.profit?.toFixed(2)}
      </span>
    </div>
  );
}

export default BalanceSheetTableItems;
