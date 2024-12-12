"use client";
import { useForm } from "react-hook-form";
import {
  Bank,
  BranchComponent,
  DateSel,
  Purpose,
  Radio,
  Remark,
  Gst,
  Tds,
  GstPercent,
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
  StatusCom,
  Currency,
} from "../_FormComponents/FormSmallComponents";
import { today } from "@/app/_services/helpers";
import { useState } from "react";
import Button from "../../utils/Button";

import { useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";

import toast from "react-hot-toast";
import { refreshUniv } from "@/app/_hooks/useUnic";

function CommissionNewEntryForm() {
  const [loading, setLoading] = useState(false);

  const { categories, particulars, banks } = useSelector(
    (state) => state.general
  );
  const { branches } = useSelector((state) => state.general);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      date: today(),
      remark: "",
      type: "",
      intake: "",
      commtion: "",
      status: "",
      agent: "",
      currency: "",
      inr: "",
    },
  });

  const intake = watch("intake");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await apiClient.post("/university", data);
      toast.success("Successfully created new Transaction");
      refreshUniv();
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

export default CommissionNewEntryForm;
