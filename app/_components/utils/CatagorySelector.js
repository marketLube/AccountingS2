"use client";
import { useSelector } from "react-redux";

function CatagorySelector({ catagory, setCatagory }) {
  const { categories } = useSelector((state) => state.general);

  return (
    <div className="catagory-selector">
      <select
        className="catagory-selector-select"
        value={catagory}
        onChange={(e) => setCatagory(e.target.value)}
      >
        <option value="">Select Catagory</option>
        {categories?.map((cat) => (
          <option value={cat.name} key={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CatagorySelector;
