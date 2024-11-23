import { Check, Close, Edit } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { truncate } from "@/app/_services/helpers";

function ParticularItemBox({
  value,
  onClick,
  setStopDropdown,
  setCurValue,
  catName,
  setIsCatagory,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [pastValue, setPastValue] = useState(value); // Store the original value before editing
  const [localCurValue, setLocalCurValue] = useState(value); // Store the local edit value
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    e.stopPropagation();
    setStopDropdown(true);
    setIsEdit(true);
    setPastValue(localCurValue);
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    setIsEdit(false);
    setStopDropdown(false);

    if (localCurValue === pastValue) return; // No changes, no need to update

    try {
    } catch (err) {
      toast.error("Duplicate category name or error occurred");
    }
  };

  const handleDiscard = (e) => {
    e.stopPropagation();
    setIsEdit(false);
    setStopDropdown(false);
    setLocalCurValue(pastValue); // Reset to past value when discarding
    setCurValue(pastValue);
  };

  const handleChange = (e) => {
    setLocalCurValue(e.target.value);
  };

  return (
    <div className="cat-item-box" onClick={onClick}>
      <input
        className="cat-item-input"
        value={truncate(localCurValue, 23)}
        readOnly={!isEdit}
        style={isEdit ? { backgroundColor: "white" } : {}}
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

export default ParticularItemBox;
