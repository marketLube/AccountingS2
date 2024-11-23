import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { truncate } from "@/app/_services/helpers";

function CatagorySelector({ style, selectedCat, setSelectedCat, className }) {
  const { categories } = useSelector((state) => state.general);
  const updatedCatagories = ["All Categories", ...categories];
  const dispatch = useDispatch();

  const handleSelectedCat = (e) => {
    dispatch(setSelectedCat(e.target.value));
  };
  return (
    <div className={`catagory-selector ${className}`} style={style}>
      <div className="cat-custom-dropdown">
        <select value={selectedCat} onChange={handleSelectedCat}>
          {updatedCatagories.map((cat, i) => (
            <option key={i} value={cat.name || cat}>
              {/* {cat?.name || cat} */}
              {truncate(cat?.name, 15) || truncate(cat, 15)}
            </option>
          ))}
        </select>
        <BsChevronDown className="icon cat-icon" />
      </div>
    </div>
  );
}

export default CatagorySelector;
