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
  StatusSel,
  Amount,
  AdminStatusSel,
  AccountStatusSel,
} from "../_FormComponents/FormSmallComponents";
import { today } from "@/app/_services/helpers";
import { useState } from "react";
import Button from "../../utils/Button";
import CatagorySelector from "../../utils/CatagorySelector";
import ParticularSelector from "../../utils/ParticularSelector";
import { useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import {
  branchFinder,
  catIdFinder,
  parIdFinder,
} from "@/app/_services/finders";
import toast from "react-hot-toast";
import { refreshReminders } from "@/app/_hooks/useReminders";

function ReminderNewEntryForm() {
  const [loading, setLoading] = useState(false);

  const { categories, particulars, banks } = useSelector(
    (state) => state.general
  );
  const { branches } = useSelector((state) => state.general);

  const [catagory, setCatagory] = useState("Select Catagory");
  const [particular, setParticular] = useState("Select Particular");

  const defaultValues = {
    date: today(),
    remark: "",
    bank: "",
    type: "",
    purpose: "",
    branch: "",
    adminstatus: "",
    accountstatus: "",
    amount: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
  });

  const handleClear = () => {
    reset(defaultValues);
    setCatagory("Select Catagory");
    setParticular("Select Particular");
  };

  const onSubmit = async (data) => {
    data.catagory = catIdFinder(categories, catagory);
    data.particular = parIdFinder(particulars, particular);

    const branch = branchFinder(data.branch, branches);
    if (!branch) return toast.error("Something went wrong..");
    data.branch = branch?._id;

    try {
      setLoading(true);
      await apiClient.post("/reminders", data);
      toast.success("Successfully created new Reminder");
      refreshReminders();
      handleClear();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-head-text">Reminder New Entry Form</h2>
      <div className="form-section">
        <CatagorySelector
          catagory={catagory}
          setCatagory={setCatagory}
          setParticular={setParticular}
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

export default ReminderNewEntryForm;
