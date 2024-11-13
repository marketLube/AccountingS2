"use client";

import { useCategoryNameFinder } from "@/app/_services/finders";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ParticularSelector from "./ParticularSelector";

function CatagorySelector({
  catagory,
  setCatagory,
  setParticular,
  particular,
}) {
  const { categories } = useSelector((state) => state.general);
  const [particulars, setParticulars] = useState([]);

  const curCat = useCategoryNameFinder(catagory);
  useEffect(() => {
    const particulars = curCat?.particulars;
    setParticulars(particulars);
  }, [catagory]);

  return (
    <div className="form-row">
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
      <ParticularSelector
        particulars={particulars}
        particular={particular}
        setParticular={setParticular}
      />
    </div>
  );
}

export default CatagorySelector;
