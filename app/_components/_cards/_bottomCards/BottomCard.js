import { formatWithCommas } from "@/app/_services/helpers";
import Arrow from "../../utils/Arrow";

function BottomCard({ type = "Liability", value = 39823958, setIsDown }) {
  const isDown = value <= 0;
  return (
    <div className="bottom">
      <div className="bottom-value">₹{formatWithCommas(value)}</div>
      <div className="bottom-down">
        <div className="bottom-type">{"Current " + type}</div>
        <Arrow size="small" isDown={setIsDown || isDown} />
      </div>
    </div>
  );
}

export default BottomCard;
