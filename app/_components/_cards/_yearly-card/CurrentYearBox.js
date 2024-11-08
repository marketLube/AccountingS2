import { thisYear } from "@/app/_services/helpers";
import CurrentYearCard from "./CurrentYearCard";

function CurrentYearBox() {
  const profit = "25,78,2359";
  return (
    <div className="current-year-box">
      <CurrentYearCard />
      <div className="current-year-box-text">
        <h4 className="topperformerhead">Profit in {thisYear()}</h4>
        <h2 className="text-small-bold">$ {profit}</h2>
      </div>
    </div>
  );
}

export default CurrentYearBox;
