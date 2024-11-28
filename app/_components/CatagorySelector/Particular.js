import { Add, Check, Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress"; // Import MUI's spinner

import ParticularItemBox from "./Components/ParticularItemBox";
import apiClient from "@/lib/axiosInstance";
import { fetchCategory } from "@/lib/slices/generalSlice";
import { checkCaseSensitivity } from "./helper";

function Particular({
  defaultValue = "Select Particular",
  particulars,
  selected,
  catagoryName,
  setParticular,
  setIsCatagory,
}) {
  const [isCat, setIsCat] = useState(false);
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
    const validateName = particulars.find(
      (particular) => particular.name === curValue
    );
    if (validateName) {
      setParticular(curValue);
    } else {
      setParticular("");
    }
  }, [curValue, setParticular, particulars, setIsCatagory]);

  useEffect(() => {
    if (particulars.length === 0 && selected) {
      setCurValue("Add Particular");
    } else if (!selected) {
      setCurValue(defaultValue);
    } else {
      setCurValue(particulars[0]?.name);
    }
  }, [selected, defaultValue, catagoryName]);

  const handleCurValue = (val) => {
    return () => {
      setIsCurEdit(false);
      setCurValue(val);
    };
  };

  const handleParticular = (e) => {
    if (curValue === "Add Particular") {
      handleAddParticular(e);
      return;
    }

    if (!stopDropdown) setIsCat((val) => !val);
    setIsCatagory(false);
  };

  const handleAddParticular = (e) => {
    e.stopPropagation();
    setIsCurEdit(true);
    setCurEditValue("");
    setStopDropdown(false);
    setIsCat(true);
  };

  const handleCurEditValue = (e) => {
    setCurEditValue(e.target.value);
    setStopDropdown(false);
    setIsCat(true);
  };

  const handleSaveParticular = async (e) => {
    e.stopPropagation();
    if (curEditValue === "") {
      toast.error("Particular name is required");
      return;
    }
    const isDup = await checkCaseSensitivity(particulars, curEditValue.trim());
    if (isDup) {
      return toast.error("Duplicate Particular");
    }

    try {
      setIsLoading(true);
      await apiClient.patch("/catagory/addParticular", {
        catagoryName,
        particular: { name: curEditValue.trim() },
      });
      dispatch(fetchCategory());
      setCurValue(curEditValue);
      toast.success("Particular added successfully");
      setIsCurEdit(false);
    } catch (err) {
      console.log(err);
      setCurValue(defaultValue);
      const message = err.response.data.message || "Network Error";
      toast.error(message);
      setIsCurEdit(true);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleDiscard = (e) => {
    e.stopPropagation();
    setCurEditValue("");
    setIsCurEdit(false);
    setIsCat(false);
  };

  return (
    <div className="catagory-creator-box">
      <div className="show-cat" onClick={handleParticular}>
        <Add
          className="show-cat-add-icon"
          style={{
            fontSize: "1.5rem",
            fill: "currentColor",
            strokeWidth: "4",
          }}
          onClick={handleAddParticular}
          disabled={isLoading} // Disable Add button while loading
        />

        {isCurEdit && (
          <input
            className="show-cat-input"
            style={isCurEdit ? { color: "black" } : {}}
            type="text"
            value={curEditValue}
            onChange={handleCurEditValue}
            onClick={(e) => e.stopPropagation()}
            disabled={isLoading} // Disable input while loading
          />
        )}
        {!isCurEdit && curValue}
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
                onClick={handleSaveParticular}
                fontSize="medium"
                className="show-cat-save-icon"
                disabled={isLoading}
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
          {particulars.length > 0 &&
            particulars.map((par) => (
              <ParticularItemBox
                particulars={particulars}
                key={par._id}
                value={par.name}
                catName={catagoryName}
                onClick={handleCurValue(par.name)}
                setIsCat={setIsCat}
                setStopDropdown={setStopDropdown}
                setCurValue={setCurValue}
                disabled={isLoading}
                setIsCatagory={setIsCatagory}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Particular;
