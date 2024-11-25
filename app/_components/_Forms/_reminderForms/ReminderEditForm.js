"use client";
import { useForm } from "react-hook-form";
import {
  DateSel,
  Purpose,
  Remark,
  BranchSelector,
  StatusSel,
  Amount,
} from "../_FormComponents/FormSmallComponents";
import { useEffect, useState } from "react";
import Button from "../../utils/Button";
import CatagorySelector from "../../utils/CatagorySelector";
import { useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import {
  branchFinder,
  catIdFinder,
  parIdFinder,
  useBranchNameFinder,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import toast from "react-hot-toast";
import { refreshReminders } from "@/app/_hooks/useReminders";

function ReminderEditForm() {
  const { selectedItems } = useSelector((state) => state.reminder);
  const [loading, setLoading] = useState(false);

  const { categories, particulars, banks } = useSelector(
    (state) => state.general
  );
  const { branches } = useSelector((state) => state.general);
  const branch = useBranchNameFinder(selectedItems?.branch);

  const curCat = useCategoryFinder(selectedItems?.catagory)?.name;
  const curPart = useParticularFinder(selectedItems?.particular)?.name;

  const [catagory, setCatagory] = useState("Select Catagory");
  const [particular, setParticular] = useState("Select Particular");

  const defaultValues = {
    date: selectedItems?.date || "",
    remark: selectedItems?.remark || "",
    purpose: selectedItems?.purpose || "",
    adminstatus: selectedItems?.adminstatus || "",
    accountstatus: selectedItems?.accountstatus || "",
    branch: branch || "",
    amount: selectedItems?.amount || "",
  };
  console.log(selectedItems);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({ defaultValues });

  useEffect(() => {
    // Reset form values based on the latest selectedItems
    reset({
      date: new Date(selectedItems?.date) || "",
      remark: selectedItems?.remark || "",
      type: selectedItems?.type || "",
      purpose: selectedItems?.purpose || "",
      status: selectedItems?.status || "",
      branch: branch || "",
      amount: selectedItems?.amount || "",
    });
    setCatagory(curCat);
    setParticular(curPart);
  }, [selectedItems, reset]);

  const onSubmit = async (data) => {
    const id = selectedItems?._id;
    data.catagory = catIdFinder(categories, catagory);
    data.particular = parIdFinder(particulars, particular);

    const branch = branchFinder(data.branch, branches);
    if (!branch) return toast.error("Something went wrong..");
    data.branch = branch?._id;

    try {
      setLoading(true);
      await apiClient.patch(`/reminders/${id}`, data);
      toast.success("Successfully created new Reminder");
      refreshReminders();
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
      <h2 className="form-head-text">Reminder Edit Form</h2>
      <div className="form-section">
        <CatagorySelector
          catagory={catagory}
          setCatagory={setCatagory}
          particular={particular}
        />

        <div className="form-row">
          <Purpose register={register} errors={errors} />
          <Amount register={register} errors={errors} />
        </div>

        <div className="form-row">
          <BranchSelector register={register} errors={errors} />
          <AdminStatusSel register={register} errors={errors} />
          <AccountStatusSel register={register} errors={errors} />
        </div>

        <div className="form-row">
          <DateSel register={register} errors={errors} />
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

export default ReminderEditForm;
