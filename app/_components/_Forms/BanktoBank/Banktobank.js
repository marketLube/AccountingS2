import { useForm } from "react-hook-form";
import Button from "../../utils/Button";
import {
  Amount,
  Bank,
  BranchSelector,
} from "../_FormComponents/FormSmallComponents";
import { Bold } from "lucide-react";

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
        <label
          style={{ width: "5rem", fontWeight: "bold", fontSize: "1.5rem" }}
        >
          From
        </label>
        <div className="form-row">
          <Bank register={register} errors={errors} />
          <BranchSelector register={register} errors={errors} />
        </div>
        <label
          style={{ width: "5rem", fontWeight: "bold", fontSize: "1.5rem" }}
        >
          To
        </label>
        <div className="form-row">
          <Bank register={register} errors={errors} />
          <BranchSelector register={register} errors={errors} />
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
