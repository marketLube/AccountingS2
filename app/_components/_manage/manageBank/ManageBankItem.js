import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import toast from "react-hot-toast";
import apiClient from "@/lib/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchBanks, fetchBranches } from "@/lib/slices/generalSlice";
import { ClipLoader } from "react-spinners";

function ManageBankItem({ bank }) {
  const dispatch = useDispatch();
  const [isItemEdit, setIsItemEdit] = useState(false);
  const [updatedInput, setUpdatedInput] = useState(bank?.name);
  const [pastVal, setPastVal] = useState(bank?.name);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUpdatedInput(bank?.name);
  }, [bank]);

  const handleIsEdit = () => {
    setIsItemEdit(true);
    setPastVal(bank?.name);
  };

  const handleCancelEdit = () => {
    setIsItemEdit(false);
  };
  const handleSave = async () => {
    if (!updatedInput) {
      setUpdatedInput(pastVal);
      return toast.error("Please enter a name");
    }
    try {
      setIsLoading(true);
      await apiClient.patch(`/bank/${bank?._id}`, { name: updatedInput });
      dispatch(fetchBanks());
      dispatch(fetchBranches());
      setIsItemEdit(false);
      setPastVal(updatedInput);
      toast.success("Success");
    } catch (e) {
      console.log(e);
      toast.error("Invalid input..");
    } finally {
      setIsLoading(false);
    }
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
            {!isLoading ? (
              <FaCheck
                onClick={handleSave}
                color="green"
                style={{ cursor: "pointer" }}
              />
            ) : (
              <ClipLoader size={16} color="blue" />
            )}
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
