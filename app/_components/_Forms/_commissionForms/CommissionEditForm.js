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
  Currency,
  StatusCom,
} from "../_FormComponents/FormSmallComponents";
import { today } from "@/app/_services/helpers";
import { useEffect, useState } from "react";
import Button from "../../utils/Button";

import { useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";

import toast from "react-hot-toast";
import { branchFinder, useBranchNameFinder } from "@/app/_services/finders";

function CommissionEditForm() {
  const [loading, setLoading] = useState(false);
  const { selectedItems } = useSelector((state) => state.commission);

  const { branches } = useSelector((state) => state.general);
  const curBranch = useBranchNameFinder(selectedItems?._id);

  const defaultValues = {
    date: selectedItems?.date,
    status: selectedItems?.status,
    branch: selectedItems?.branch,
    amount: selectedItems?.amount,
    student: selectedItems?.student,
    counsillor: selectedItems?.counsillor,
    country: selectedItems?.country,
    university: selectedItems?.university,
    agent: selectedItems?.agent,
    courseFee: selectedItems?.courseFee,
    commition: selectedItems?.commition,
    inr: selectedItems?.inr,
    currency: selectedItems?.currency,
    intake: selectedItems?.intake,
    intakeMonth: selectedItems?.intakeMonth,
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
      date:
        selectedItems?.date && !isNaN(new Date(selectedItems.date))
          ? new Date(selectedItems.date).toISOString().split("T")[0]
          : "",
      status: selectedItems?.status || "",
      branch: selectedItems?.branch || "",
      amount: selectedItems?.amount || "",
      student: selectedItems?.student || "",
      counsillor: selectedItems?.counsillor || "",
      country: selectedItems?.country || "",
      university: selectedItems?.university || "",
      courseFee: selectedItems?.courseFee || "",
      commition: selectedItems?.commition || "",
      inr: selectedItems?.inr || "",
      agent: selectedItems?.agent || "",
      currency: selectedItems?.currency || "",
      intake: selectedItems?.intake || "",
      intakeMonth: selectedItems?.intakeMonth || "",
    });
  }, [selectedItems, reset]);

  const intake = watch("intake");

  const onSubmit = async (data) => {
    const id = selectedItems?._id;
    const branch = branchFinder(data.branch, branches);
    if (!branch) return toast.error("Something went wrong..");
    data.branch = branch?._id;
    console.log(data, "sl");
    try {
      setLoading(true);
      await apiClient.patch(`/university/${id}`, data);
      toast.success("Successfully edited");
      reset();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }

    return;
  };
  console.log(selectedItems, "iiiiiiiiii");

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-head-text">Commission Edited Form</h2>
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
          <Currency register={register} errors={errors} />
          <StatusCom register={register} errors={errors} />
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

export default CommissionEditForm;
