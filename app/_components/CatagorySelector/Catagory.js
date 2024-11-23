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

function Catagory({
  defaultValue = "Select Category",
  setCatagory,
  setParticular,
  defaultParticular,
}) {
  const [isCat, setIsCat] = useState(false);
  const [curValue, setCurValue] = useState(defaultValue);
  const { categories: catagories } = useSelector((state) => state.general);
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
    if (await checkCaseSensitivity(catagories, curEditValue)) {
      console.log("hittling");
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
        name: curEditValue,
      });
      setCurValue(response.data.data.name);
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
              onChange={handleCurEditValue}
              onClick={(e) => e.stopPropagation()}
              disabled={isLoading} // Disable input while loading
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
            {catagories.map((cat) => (
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
        disabled={isLoading} // Disable Particular component while loading
      />
    </div>
  );
}

export default Catagory;
