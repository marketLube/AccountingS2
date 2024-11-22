import { useForm } from "react-hook-form";
import Button from "../../utils/Button";
import { Bank, BranchSelector } from "../_FormComponents/FormSmallComponents";

function Banktobank() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      bank: "",
      purpose: "",
      branch: "",
    },
  });
  return (
    <form className="form">
      <div className="form-section">
        <label style={{ width: "5rem", margin: "0 auto" }}>From</label>
        <div className="form-row">
          <Bank register={register} errors={errors} />
          <BranchSelector register={register} errors={errors} />
        </div>
        <label>To</label>
        <div className="form-row">
          <Bank register={register} errors={errors} />
          <BranchSelector register={register} errors={errors} />
        </div>
      </div>
      <div className="form-btn-group form-submit-btns">
        <Button type="submit">Tasfer</Button>
      </div>
    </form>
  );
}

export default Banktobank;
