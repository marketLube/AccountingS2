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
} from "../_FormComponents/FormSmallComponents";
import { today } from "@/app/_services/helpers";
import { useState } from "react";
import Button from "../../utils/Button";
import CatagorySelector from "../../utils/CatagorySelector";
import ParticularSelector from "../../utils/ParticularSelector";
import { useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";

function DaybookNewEntirForm() {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const { branches } = useSelector((state) => state.general);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      date: today(),
      remark: "",
      bank: "",
      type: "",
      purpose: "",
      tds: "",
      gstPercent: "",
      gstType: "",
    },
  });

  const onSubmit = async (data) => {
    const branchObjects = selectedBranches.map((branch) => {
      const branchObj = branches.find(
        (branchObjs) => branchObjs.name === branch
      );

      return {
        branch: branchObj._id,
        amount: parseFloat(data[branchObj.name]),
      };
    });

    data.branches = branchObjects;

    try {
      const res = await apiClient.post("/transaction");
    } catch (e) {}

    return;
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <div className="form-row">
          <CatagorySelector />
          <ParticularSelector />
        </div>
        <div className="form-row">
          <Purpose register={register} errors={errors} />
          <Remark register={register} errors={errors} />
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
      <div className="form-row">
        <Tds register={register} errors={errors} />
        <Gst register={register} errors={errors} />
        <GstPercent register={register} errors={errors} />
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

export default DaybookNewEntirForm;