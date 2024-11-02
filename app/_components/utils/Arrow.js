import { GoArrowUpRight } from "react-icons/go";

function Arrow({ color, size }) {
  const arrowSizeClass = size === "small" ? "arrowsmall" : "arrowlarge";
  return (
    <div
      className={`arrow ${arrowSizeClass}`}
      style={{ backgroundColor: color }}
    >
      <GoArrowUpRight color="white" />
    </div>
  );
}

export default Arrow;
