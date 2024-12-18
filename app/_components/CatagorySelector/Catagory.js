import { useEffect, useState } from "react";
import Particular from "./Particular";
import CatItemBox from "./Components/CatItemBox";
import { useDispatch, useSelector } from "react-redux";
import { Add, Check, Close } from "@mui/icons-material";
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
    };
  };

  const handleCatagory = () => {
    if (!stopDropdown) setIsCat((val) => !val);
  };

  const handleAddCatagory = (e) => {
    e.stopPropagation();
    setCurEditValue("");
    setIsCurEdit(true);
    setStopDropdown(false);
    setIsCat(true);
  };
  const handleCurEditValue = (e) => {
    setCurEditValue(e.target.value);
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
  };

  const particulars = (
    catagories.find((cat) => cat.name === curValue)?.particulars || []
  )
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const [showCats, setShowCats] = useState(catagories);

  useEffect(() => {
    if (!isCurEdit) {
      setShowCats(catagories);
      return;
    }
    if (curEditValue === "") {
      setShowCats(catagories);
      return;
    }
    const show = catagories.filter((par) =>
      par?.name?.toLowerCase().startsWith(curEditValue?.toLowerCase())
    );

    setShowCats(show);
  }, [curEditValue]);

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
              ing
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
