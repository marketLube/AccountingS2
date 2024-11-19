import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";

function Arrow({ color, size, isDown = false }) {
  const arrowSizeClass = size === "small" ? "arrowsmall" : "arrowlarge";
  let col = "#00ba9d";

  if (isDown) {
    col = "#0040ff";
  }
  return (
    <div
      className={`arrow ${arrowSizeClass}`}
      style={{ backgroundColor: color || col }}
    >
      {isDown ? (
        <GoArrowDownRight color="white" />
      ) : (
        <GoArrowUpRight color="white" />
      )}
    </div>
  );
}

export default Arrow;
