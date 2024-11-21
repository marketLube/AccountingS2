"use client";
import { useForm } from "react-hook-form";
import {
  Amount,
  AssetsType,
  BranchSelector,
  DateSel,
  Item,
  PurchasedBy,
  Remark,
} from "../_FormComponents/FormSmallComponents";
import { today } from "@/app/_services/helpers";
import { useState } from "react";
import Button from "../../utils/Button";
import { useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import { branchFinder } from "@/app/_services/finders";
import toast from "react-hot-toast";
import { refreshAssets } from "@/app/_hooks/useAssets";

function AssetesNewEntryForms() {
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
      branch: "",
      purchasedBy: "",
      purpose: "",
      item: "",
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
      await apiClient.post("/assets", data);
      toast.success("Successfully created new Asset");
      refreshAssets();
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
      <div className="form-section">
        <div className="form-row">
          <Item register={register} errors={errors} />
          <Amount register={register} errors={errors} />
        </div>

        <div className="form-row">
          <DateSel register={register} errors={errors} />
          <BranchSelector register={register} errors={errors} />
        </div>

        <div className="form-row">
          <PurchasedBy register={register} errors={errors} />
          <AssetsType register={register} errors={errors} />
        </div>
        <div className="form-row">
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

export default AssetesNewEntryForms;
