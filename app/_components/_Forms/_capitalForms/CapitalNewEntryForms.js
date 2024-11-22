"use client";
import { useForm } from "react-hook-form";
import {
  DateSel,
  Remark,
  Invested,
  AssetsType,
  Amount,
  BranchSelector,
} from "../_FormComponents/FormSmallComponents";
import { today } from "@/app/_services/helpers";
import { useState } from "react";
import Button from "../../utils/Button";
import { useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import { branchFinder } from "@/app/_services/finders";
import toast from "react-hot-toast";
import { refreshCapital } from "@/app/_hooks/useCapital";

function CapitalNewEntryForms() {
  const [loading, setLoading] = useState(false);
  const { branches } = useSelector((state) => state.general);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      date: today(),
      remark: "",
      invested: "",
      branch: "",
      amount: "",
      type: "",
    },
  });

  const onSubmit = async (data) => {
    const branch = branchFinder(data.branch, branches);
    if (!branch) return toast.error("Something went wrong..");
    data.branch = branch?._id;

    try {
      setLoading(true);
      await apiClient.post("/capital", data);
      toast.success("Successfully created new Capital");
      refreshCapital();
      reset();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          paddingBottom: "1rem",
        }}
      >
        Capital New Entry Form
      </h2>
      <div className="form-section">
        <div className="form-row">
          <Invested register={register} errors={errors} />
          <DateSel register={register} errors={errors} />
        </div>

        <div className="form-row">
          <Amount register={register} errors={errors} />
          <AssetsType register={register} errors={errors} />
        </div>
        <div className="form-row">
          <BranchSelector register={register} errors={errors} />
          <Remark register={register} errors={errors} />
        </div>
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
    </form>
  );
}

export default CapitalNewEntryForms;
