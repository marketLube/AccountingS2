import { Check, Close, Edit } from "@mui/icons-material";
import { useState } from "react";
import toast from "react-hot-toast";
import { truncate } from "@/app/_services/helpers";
import apiClient from "@/lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { checkCaseSensitivity } from "../helper";
import { fetchCategory } from "@/lib/slices/generalSlice";

function CatItemBox({ value, onClick, setStopDropdown, setCurValue, id }) {
  const { categories } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [pastValue, setPastValue] = useState(value); // Store the original value
  const [localCurValue, setLocalCurValue] = useState(value); // Local editable

  const handleEdit = async (e) => {
    e.stopPropagation();
    setStopDropdown(true);
    setIsEdit(true);
    setPastValue(localCurValue); // Capture the current value when entering edit mode
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    setIsEdit(false);
    setStopDropdown(false);

    if (localCurValue === pastValue) return; // If no changes, do nothing

    try {
      const isDup = await checkCaseSensitivity(
        categories,
        localCurValue.trim()
      );
      if (isDup) {
        setLocalCurValue(pastValue);
        setCurValue(pastValue);
        return toast.error("Catagory already exist");
      }
      await apiClient.patch(`/catagory/${id}`, { name: localCurValue.trim() });
      setPastValue(localCurValue.trim());
      setCurValue(localCurValue.trim());
      dispatch(fetchCategory());
      toast.success("Category updated successfully");
    } catch (err) {
      toast.error("Duplicate category name or error occurred");

      setCurValue(pastValue); // Revert to the previous value in case of error
      setLocalCurValue(pastValue);
    }
  };

  const handleDiscard = (e) => {
    e.stopPropagation();
    setIsEdit(false);
    setStopDropdown(false);
    setCurValue(pastValue); // Restore to past value
    setLocalCurValue(pastValue); // Reset local value to the original
  };

  const handleChange = (e) => {
    setLocalCurValue(e.target.value); // Track input changes locally
  };

  if (value === "Select Category") return null;
  return (
    <div className="cat-item-box" onClick={onClick}>
      <input
        className="cat-item-input"
        value={truncate(localCurValue, 25)}
        readOnly={!isEdit}
        style={isEdit ? { backgroundColor: "white", color: "black" } : {}}
        onChange={handleChange}
      />
      <div className="cat-icon-box">
        {isEdit ? (
          <>
            <Check
              fontSize="medium"
              className="save-icon"
              onClick={handleSave}
            />
            <Close
              fontSize="medium"
              className="discard-icon"
              onClick={handleDiscard}
            />
          </>
        ) : (
          <Edit fontSize="small" className="edit-icon" onClick={handleEdit} />
        )}
      </div>
    </div>
  );
}

export default CatItemBox;
