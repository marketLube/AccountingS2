"use client";
import { useSelector } from "react-redux";

function ParticularSelector() {
  const { particulars } = useSelector((state) => state.general);
  if (!particulars) return null;

  return (
    <div className="catagory-selector">
      <select className="catagory-selector-select">
        <option value="">Select Particular</option>
        {particulars?.map((cat) => (
          <option value={cat.name} key={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ParticularSelector;
