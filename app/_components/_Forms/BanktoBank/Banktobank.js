import { useForm } from "react-hook-form";
import Button from "../../utils/Button";
import {
  Amount,
  Bank,
  BranchSelector,
} from "../_FormComponents/FormSmallComponents";
import apiClient from "@/lib/axiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { bankIdFiner, branchFinder } from "@/app/_services/finders";
import { fetchBanks, fetchBranches } from "@/lib/slices/generalSlice";
import { refreshBankToBank } from "@/app/_hooks/useBankToBank";

function Banktobank() {
  const [loading, setLoading] = useState(false);
  const { banks, branches } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      toBank: "",
      toBranch: "",
      fromBank: "",
      fromBranch: "",
    },
  });

  const onSubmit = async (data) => {
    if (data.fromBank === data.toBank && data.toBank === data.fromBank) {
      return toast.error("Invalid transaction..");
    }
    
    data.fromBank = bankIdFiner(banks, data.fromBank);
    data.fromBranch = branchFinder(data.fromBranch, branches)?._id;
    data.toBank = bankIdFiner(banks, data.toBank);
    data.toBranch = branchFinder(data.toBranch, branches)?._id;
    data.amount = parseFloat(data.amount);

    console.log(data, "data");

    try {
      setLoading(true);
      await apiClient.post("/to-bank", data);
      toast.success("Successfully created new Transaction");
      dispatch(fetchBranches());
      dispatch(fetchBanks());
      refreshBankToBank();
      reset();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
    return;
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <label
          style={{ width: "5rem", fontWeight: "bold", fontSize: "1.5rem" }}
        >
          From
        </label>
        <div className="form-row">
          <Bank register={register} errors={errors} val="fromBank" />
          <BranchSelector
            register={register}
            errors={errors}
            val="fromBranch"
          />
        </div>
        <label
          style={{ width: "5rem", fontWeight: "bold", fontSize: "1.5rem" }}
        >
          To
        </label>
        <div className="form-row">
          <Bank register={register} errors={errors} val="toBank" />
          <BranchSelector register={register} errors={errors} val="toBranch" />
        </div>
        <Amount register={register} errors={errors} />
      </div>
      <div className="form-btn-group form-submit-btns">
        <Button type="clear">Clear</Button>
        <Button type="submit">Transfer</Button>
      </div>
    </form>
  );
}

export default Banktobank;
