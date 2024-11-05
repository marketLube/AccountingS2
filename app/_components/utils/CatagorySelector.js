"use client";
import { useSelector } from "react-redux";

function CatagorySelector() {
  const { catagories, particulars } = useSelector((state) => state.general);
  if (!catagories || !particulars) return null;
  return (
    <div>
      <div className="formgroup">
        <select className="formselect">
          <option value="">Select Catagory</option>
          {catagories.map((cat) => (
            <option value={cat.name} key={cat._id}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CatagorySelector;
