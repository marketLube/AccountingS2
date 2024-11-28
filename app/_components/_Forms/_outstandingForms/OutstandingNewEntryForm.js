"use client";
import { useForm } from "react-hook-form";
import {
  BranchComponent,
  DateSel,
  Purpose,
  Remark,
  StatusSel,
} from "../_FormComponents/FormSmallComponents";
import { today } from "@/app/_services/helpers";
import { useState } from "react";
import Button from "../../utils/Button";
import CatagorySelector from "../../utils/CatagorySelector";
import ParticularSelector from "../../utils/ParticularSelector";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import { bankIdFiner, catIdFinder, parIdFinder } from "@/app/_services/finders";
import toast from "react-hot-toast";
import { refreshOutstanding } from "@/app/_hooks/useOutstanding";
import { refreshDashboardTotals } from "@/app/_hooks/useDashboard";

function OutstandingNewEntryForm() {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
    purpose: "",
    status: "",
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
    setCatagory("Select Catagory");
    setParticular("Select Particular");
    setSelectedBranches([]);
    reset(defaultValues);
  };

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
    data.catagory = catIdFinder(categories, catagory);
    data.particular = parIdFinder(particulars, particular);
    data.bank = bankIdFiner(banks, data.bank);
    data.type = "outstanding";

    try {
      setLoading(true);
      await apiClient.post("/liability", data);
      toast.success("Successfully created new Outstanding");
      refreshOutstanding();
      refreshDashboardTotals();
      handleClear();
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
      <h2 className="form-head-text">Outstanding New Entry Form</h2>
      <div className="form-section">
        <CatagorySelector
          catagory={catagory}
          setCatagory={setCatagory}
          setParticular={setParticular}
        />

        <div className="form-row">
          <Purpose register={register} errors={errors} />
          <StatusSel register={register} errors={errors} />
        </div>

        <div className="form-row">
          <DateSel register={register} errors={errors} />
          <Remark register={register} errors={errors} />
        </div>
      </div>
      <BranchComponent
        setSelectedBranches={setSelectedBranches}
        clearErrors={clearErrors}
        selectedBranches={selectedBranches}
        errors={errors}
        register={register}
      />
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

export default OutstandingNewEntryForm;
