"use client";
import { useForm } from "react-hook-form";
import {
  Bank,
  BranchComponent,
  DateSel,
  Purpose,
  Radio,
  Remark,
} from "../_FormComponents/FormSmallComponents";
import { today } from "@/app/_services/helpers";
import { useState } from "react";

function DaybookNewEntirForm() {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      transaction: "",
      date: today(),
      remark: "",
      bank: "",
      type: "",
      purpose: "",
    },
  });
  return (
    <form className="form">
      <div className="form-section">
        <div className="form-row">
          <Purpose register={register} errors={errors} />
          <Purpose register={register} errors={errors} />
          {/* <Remark register={register} errors={errors} /> */}
        </div>

        <div className="form-row">
          <Bank register={register} errors={errors} />
          <Radio register={register} errors={errors} />
          <DateSel register={register} errors={errors} />
        </div>
      </div>
      <BranchComponent
        setSelectedBranches={setSelectedBranches}
        clearErrors={clearErrors}
        selectedBranches={selectedBranches}
        errors={errors}
        register={register}
      />

      <div className="form-btn-group form-submit-btns">
        <button type="button" className="btn delete-btn">
          Clear
        </button>
        <button
          type="submit"
          style={loading ? { opacity: 0.5 } : {}}
          className={`btn primary-blue-btn form-submit`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default DaybookNewEntirForm;
