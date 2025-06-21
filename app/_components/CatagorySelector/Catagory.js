import { useEffect, useState } from "react";
import Particular from "./Particular";
import CatItemBox from "./Components/CatItemBox";
import { useDispatch, useSelector } from "react-redux";
import { Add, Check, Close, Search } from "@mui/icons-material";
import toast from "react-hot-toast";

import CircularProgress from "@mui/material/CircularProgress"; // Import MUI's spinner
import { truncate } from "@/app/_services/helpers";
import apiClient from "@/lib/axiosInstance";
import { fetchCategory } from "@/lib/slices/generalSlice";
import { checkCaseSensitivity } from "./helper";
import { useCategoryFinder } from "@/app/_services/finders";

function Catagory({
  defaultValue = "Select Category",
  setCatagory,
  setParticular,
  defaultParticular = "Select Particular",
}) {
  const [isCat, setIsCat] = useState(false);
  const { categories: catagories } = useSelector((state) => state.general);
  const [curValue, setCurValue] = useState(defaultValue);
  const [stopDropdown, setStopDropdown] = useState(false);
  const [isCurEdit, setIsCurEdit] = useState(false);
  const [curEditValue, setCurEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setCurValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const id = catagories.find((cat) => cat.name === curValue)?._id;
    setCatagory(id);
  }, [curValue, setCatagory, catagories, defaultValue]);

  const handleCurValue = (val) => {
    return () => {
      setIsCurEdit(false);
      setCurValue(val);
      setSearchValue(""); // Clear search when selecting a category
    };
  };

  const handleCatagory = () => {
    if (!stopDropdown) {
      setIsCat((val) => !val);
      if (!isCat) {
        setSearchValue(""); // Clear search when opening dropdown
      }
    }
  };

  const handleAddCatagory = (e) => {
    e.stopPropagation();
    setCurEditValue("");
    setIsCurEdit(true);
    setStopDropdown(false);
    setIsCat(true);
    setSearchValue(""); // Clear search when starting to add new category
  };

  const handleCurEditValue = (e) => {
    setCurEditValue(e.target.value);
    setStopDropdown(false);
    setIsCat(true);
  };

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
    setStopDropdown(false);
    setIsCat(true);
  };

  const handleSaveCatagory = async (e) => {
    e.stopPropagation();
    const isDup = await checkCaseSensitivity(catagories, curEditValue);
    if (isDup) {
      return toast.error("Catagory already exist");
    }
    if (curEditValue === "") {
      toast.error("Catagory name is required");
      return;
    }
    try {
      setIsLoading(true);
      setCurValue(curEditValue);
      const response = await apiClient.post("/catagory", {
        name: curEditValue.trim(),
      });
      setCurValue(response.data.data.name.trim());
      dispatch(fetchCategory());
      toast.success("Catagory added successfully");
      setIsCurEdit(false);
      setSearchValue(""); // Clear search after adding category
    } catch (err) {
      console.log(err);
      toast.error("Catagory already exist");
      setCurValue(defaultValue);
      setIsCurEdit(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = (e) => {
    e.stopPropagation();
    setCurEditValue("");
    setIsCurEdit(false);
    setIsCat(false);
    setSearchValue(""); // Clear search when discarding
  };

  // const findSalaryCatagory = catagories.find((cat) => cat.name === "Salary");
  // console.log(findSalaryCatagory, "findSalaryCatagory");
  // const findSalaryParticulars = findSalaryCatagory?.particulars || [];
  // console.log(findSalaryParticulars, "findSalaryParticulars");
  // const findIncentivePayable = catagories.find(
  //   (cat) => cat.name === "Incentive Payable"
  // );
  // console.log(findIncentivePayable, "findIncentivePayable");
  // const findIncentivePayableParticulars =
  //   findIncentivePayable?.particulars || [];
  // console.log(
  //   findIncentivePayableParticulars,
  //   "findIncentivePayableParticulars"
  // );

  // const findSameParticulars = findIncentivePayableParticulars.filter(
  //   (salaryParticular) =>
  //     findSalaryParticulars.some(
  //       (incentiveParticular) =>
  //         incentiveParticular.name === salaryParticular.name
  //     )
  // );

  // console.log(findSameParticulars, "dfdfdfdfsfsdrtwerfsdfsd");

  const particulars = (
    catagories.find((cat) => cat.name === curValue)?.particulars || []
  )
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const [showCats, setShowCats] = useState(catagories);

  useEffect(() => {
    if (isCurEdit) {
      // When in edit mode, filter by edit value
      if (curEditValue === "") {
        setShowCats(catagories);
        return;
      }
      const show = catagories.filter((par) =>
        par?.name?.toLowerCase().startsWith(curEditValue?.toLowerCase())
      );
      setShowCats(show);
    } else {
      // When not in edit mode, filter by search value
      if (searchValue === "") {
        setShowCats(catagories);
        return;
      }
      const show = catagories.filter((par) =>
        par?.name?.toLowerCase().includes(searchValue?.toLowerCase())
      );
      setShowCats(show);
    }
  }, [curEditValue, searchValue, catagories, isCurEdit]);

  return (
    <div className="catagory">
      <div className="catagory-creator-box">
        <div className="show-cat" onClick={handleCatagory}>
          <Add
            className="show-cat-add-icon"
            style={{
              fontSize: "1.5rem",
              fill: "currentColor",
              strokeWidth: "4",
            }}
            onClick={handleAddCatagory}
            disabled={isLoading}
          />

          {isCurEdit && (
            <input
              className="show-cat-input "
              type="text"
              value={curEditValue}
              style={isCurEdit ? { color: "black" } : {}}
              onChange={handleCurEditValue}
              onClick={(e) => e.stopPropagation()}
              disabled={isLoading}
              placeholder="Enter category name"
            />
          )}
          {!isCurEdit && truncate(curValue, 20)}

          {isCurEdit && (
            <div className="show-cat-icon-box">
              {isLoading ? (
                <CircularProgress
                  size={24} // Small spinner size
                  className="loading-spinner"
                />
              ) : (
                <Check
                  style={{
                    fontSize: "1.5rem",
                    fill: "currentColor",
                    strokeWidth: "4",
                  }}
                  onClick={handleSaveCatagory}
                  fontSize="medium"
                  className="show-cat-save-icon"
                  disabled={isLoading} // Disable Check button while loading
                />
              )}
              <Close
                fontSize="medium"
                className="discard-icon"
                style={{
                  fontSize: "1.5rem",
                  fill: "currentColor",
                  strokeWidth: "4",
                }}
                onClick={handleDiscard}
                disabled={isLoading}
              />
            </div>
          )}

          <div
            className="cat-items"
            style={
              isCat ? { transform: "scaleY(1)" } : { transform: "scaleY(0)" }
            }
          >
            {!isCurEdit && (
              <div
                className="search-container"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <input
                  className="search-input"
                  type="text"
                  value={searchValue}
                  onChange={handleSearchValue}
                  placeholder="Search categories..."
                  disabled={isLoading}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    width: "100%",
                    padding: "8px 15px",
                  }}
                />
              </div>
            )}
            {showCats?.map((cat) => (
              <CatItemBox
                key={cat._id}
                id={cat._id}
                value={cat.name}
                onClick={handleCurValue(cat.name)}
                setIsCat={setIsCat}
                setStopDropdown={setStopDropdown}
                setCurValue={setCurValue}
                type="catagory"
                disabled={isLoading} // Disable category items while loading
              />
            ))}
          </div>
        </div>
      </div>
      <Particular
        particulars={particulars}
        selected={curValue !== defaultValue}
        catagoryName={curValue}
        setParticular={setParticular}
        defaultValue={defaultParticular}
        setIsCatagory={setIsCat}
        disabled={isLoading}
      />
    </div>
  );
}

export default Catagory;
