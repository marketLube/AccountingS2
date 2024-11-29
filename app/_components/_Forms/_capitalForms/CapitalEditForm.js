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
import { useEffect, useState } from "react";
import Button from "../../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import { branchFinder, useBranchNameFinder } from "@/app/_services/finders";
import toast from "react-hot-toast";
import { refreshCapital } from "@/app/_hooks/useCapital";
import { se } from "date-fns/locale";
import {
  setCapitalIsEdit,
  setCapitalSelectedItems,
} from "@/lib/slices/capitalSlice";

function CapitalEditForms() {
  const [loading, setLoading] = useState(false);
  const { branches } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const { selectedItems } = useSelector((state) => state.capital);

  const branch = useBranchNameFinder(selectedItems?.branch);

  const defaultValues = {
    date:
      selectedItems?.date && !isNaN(new Date(selectedItems.date))
        ? new Date(selectedItems.date).toISOString().split("T")[0]
        : "",
    remark: selectedItems?.remark,
    type: selectedItems?.type,
    invested: selectedItems?.invested,
    branch: branch,
    amount: selectedItems?.amount,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    // Reset form values based on the latest selectedItems
    reset({
      date:
        selectedItems?.date && !isNaN(new Date(selectedItems.date))
          ? new Date(selectedItems.date).toISOString().split("T")[0]
          : "",
      remark: selectedItems?.remark || "",
      type: selectedItems?.type || "",
      invested: selectedItems?.invested || "",
      branch: branch || "",
      amount: selectedItems?.amount || "",
    });
  }, [selectedItems, reset]);

  const onSubmit = async (data) => {
    const id = selectedItems?._id;
    const branch = branchFinder(data.branch, branches);
    if (!branch) return toast.error("Something went wrong..");
    data.branch = branch?._id;

    try {
      setLoading(true);
      await apiClient.patch(`/capital/${id}`, data);
      toast.success("Successfully Edited");
      refreshCapital();
      reset();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    reset({
      date: today(),
      remark: "",
      type: "",
      invested: "",
      branch: "",
      amount: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-head-text">Capital Edit Form</h2>
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
        <Button type="clear" onClick={handleClear}>
          Clear
        </Button>
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

export default CapitalEditForms;
