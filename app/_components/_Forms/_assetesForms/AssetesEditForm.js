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
import { useEffect, useState } from "react";
import Button from "../../utils/Button";
import { useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import { branchFinder, useBranchNameFinder } from "@/app/_services/finders";
import toast from "react-hot-toast";
import { refreshAssets } from "@/app/_hooks/useAssets";

function AssetesEditForms() {
  const [loading, setLoading] = useState(false);
  const { branches } = useSelector((state) => state.general);
  const { selectedItems } = useSelector((state) => state.assets);

  const branch = useBranchNameFinder(selectedItems?.branch);

  const defaultValues = {
    date: selectedItems?.date,
    remark: selectedItems?.remark,
    type: selectedItems?.type,
    purchasedBy: selectedItems?.purchasedBy,
    branch: branch,
    amount: selectedItems?.amount,
    item: selectedItems?.item,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    // Reset form values based on the latest selectedItems
    reset({
      date: new Date(selectedItems?.date) || "",
      remark: selectedItems?.remark || "",
      type: selectedItems?.type || "",
      purchasedBy: selectedItems?.purchasedBy || "",
      branch: branch || "",
      amount: selectedItems?.amount || "",
      item: selectedItems?.item || "",
    });
  }, [selectedItems, reset]);

  const onSubmit = async (data) => {
    const id = selectedItems?._id;
    const branch = branchFinder(data.branch, branches);
    if (!branch) return toast.error("Something went wrong..");
    data.branch = branch?._id;
    try {
      setLoading(true);
      await apiClient.patch(`/assets/${id}`, data);
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
      <h2 className="form-head-text">Asset edit Form</h2>
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

export default AssetesEditForms;
