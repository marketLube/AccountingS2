"use client";
import { useForm } from "react-hook-form";
import {
  Bank,
  DateSel,
  Remark,
  BranchSelector,
  Student,
  Counsillor,
  Country,
  University,
  Commission,
  INR,
  Agent,
  IntakeSelector,
  MonthSelector,
  StatusSel,
  CourseFee,
} from "../_FormComponents/FormSmallComponents";
import { today } from "@/app/_services/helpers";
import { useState } from "react";
import Button from "../../utils/Button";

import { useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";

import toast from "react-hot-toast";

function CommissionNewEntryForm() {
  const [loading, setLoading] = useState(false);
  const { selectedItems } = useSelector((state) => state.commission);

  const [selectedBranches, setSelectedBranches] = useState(
    selectedItems?.branches?.map((branch) => branch?.branch?.name) || []
  );
  const defaultAmounts = selectedItems?.branches?.map(
    (branch) => branch?.amount
  );

  const { categories, particulars, banks } = useSelector(
    (state) => state.general
  );
  const { branches } = useSelector((state) => state.general);
  const branch = useBranchNameFinder(selectedItems?.branch);

  const defaultValues = {
    date: selectedItems?.date,
    remark: selectedItems?.remark,
    status: selectedItems?.status,
    branch: branch,
    amount: selectedItems?.amount,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm({ defaultValues });

  useEffect(() => {
    // Reset form values based on the latest selectedItems
    reset({
      remark: selectedItems?.remark || "",
      status: selectedItems?.status || "",
      branch: branch || "",
      amount: selectedItems?.amount || "",
    });
  }, [selectedItems, reset]);

  const intake = watch("intake");

  const onSubmit = async (data) => {
    const id = selectedItems?._id;
    const branch = branchFinder(data.branch, branches);
    if (!branch) return toast.error("Something went wrong..");
    data.branch = branch?._id;
    try {
      setLoading(true);
      await apiClient.patch(`/university/${id}`, data);
      toast.success("Successfully edited");
      reset();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
      setLoading(false);
    }

    return;
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-head-text">Commission New Entry Form</h2>
      <div className="form-section">
        <div className="form-row">
          <DateSel register={register} errors={errors} />
          <BranchSelector register={register} errors={errors} />
          <Counsillor register={register} errors={errors} />
        </div>
        <label style={{ width: "10rem", margin: "auto" }}>
          Student Details
        </label>
        <div className="form-row">
          <Student register={register} errors={errors} />
          <Country register={register} errors={errors} />
          <University register={register} errors={errors} />
        </div>

        <div className="form-row">
          <Bank register={register} errors={errors} />
          <Commission register={register} errors={errors} />
          <INR register={register} errors={errors} />
        </div>

        <div className="form-row">
          <Agent register={register} errors={errors} />
          <IntakeSelector register={register} errors={errors} />
          <MonthSelector
            register={register}
            errors={errors}
            isApril={intake === "April-October"}
            disabled={!intake}
          />
        </div>
        <div className="form-row">
          <CourseFee register={register} errors={errors} />
          <StatusSel register={register} errors={errors} />
          <Remark register={register} errors={errors} />
        </div>
        <div className="form-btn-group form-submit-btns">
          <Button type="clear">Clear</Button>
          <Button
            type="submit"
            style={loading ? { opacity: 0.5 } : {}}
            className={`btn primary-blue-btn form-submit`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CommissionNewEntryForm;
