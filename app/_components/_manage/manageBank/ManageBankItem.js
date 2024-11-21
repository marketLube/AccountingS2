import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import toast from "react-hot-toast";

function ManageBankItem({ bank }) {
  const [isItemEdit, setIsItemEdit] = useState(false);
  const [updatedInput, setUpdatedInput] = useState(bank?.name);
  const [pastVal, setPastVal] = useState(bank?.name);

  const handleIsEdit = () => {
    setIsItemEdit(true);
    setPastVal(bank?.name);
  };

  const handleCancelEdit = () => {
    setIsItemEdit(false);
  };
  const handleSave = () => {
    if (!updatedInput) {
      setUpdatedInput(pastVal);
      return toast.error("Please enter a name");
    }
    setIsItemEdit(false);
    setPastVal(updatedInput);
  };

  const handleChange = (e) => {
    setUpdatedInput(e.target.value);
  };

  return (
    <div className="manage-box-container-body-item">
      {isItemEdit ? (
        <>
          <input
            value={updatedInput}
            style={{ color: "black" }}
            onChange={handleChange}
            placeholder="Add bank"
          />
          <span className="manage-box-container-body-item-inputbtn">
            <RxCross2
              onClick={handleCancelEdit}
              color="red"
              style={{ cursor: "pointer" }}
            />
            <FaCheck
              onClick={handleSave}
              color="green"
              style={{ cursor: "pointer" }}
            />
          </span>
        </>
      ) : (
        <>
          <span onClick={() => setIsItemEdit((val) => !val)}>
            {updatedInput}
          </span>
          <MdModeEdit style={{ cursor: "pointer" }} onClick={handleIsEdit} />
        </>
      )}
    </div>
  );
}

export default ManageBankItem;
