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
import { useEffect, useState } from "react";
import Button from "../../utils/Button";
import CatagorySelector from "../../utils/CatagorySelector";
import ParticularSelector from "../../utils/ParticularSelector";
import { useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import {
  bankIdFiner,
  catIdFinder,
  parIdFinder,
  useCategoryFinder,
  useParticularFinder,
  useStatusFinder,
} from "@/app/_services/finders";
import toast from "react-hot-toast";

import { refreshLiability } from "@/app/_hooks/useLiability";
import { refreshLedger } from "@/app/_hooks/useLedgers";
import { refreshDashboardTotals } from "@/app/_hooks/useDashboard";

function LiabilityEditForm() {
  const { selectedItems } = useSelector((state) => state.liability);

  const [selectedBranches, setSelectedBranches] = useState(
    selectedItems?.branches?.map((branch) => branch?.branch?.name) || []
  );
  const defaultAmounts = selectedItems?.branches?.map(
    (branch) => branch?.amount
  );

  const [loading, setLoading] = useState(false);

  const { categories, particulars, branches } = useSelector(
    (state) => state.general
  );

  const curCat = useCategoryFinder(selectedItems?.catagory)?.name;
  const curPart = useParticularFinder(selectedItems?.particular)?.name;

  const [catagory, setCatagory] = useState("Select Catagory");
  const [particular, setParticular] = useState("Select Particular");

  const defaultValues = {
    date: selectedItems?.date,
    remark: selectedItems?.remark,
    type: selectedItems?.type,
    purpose: selectedItems?.purpose,
    status: selectedItems?.status,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    // Reset form values based on the latest selectedItems
    reset({
      date:
        selectedItems?.date && !isNaN(new Date(selectedItems.date))
          ? new Date(selectedItems.date).toISOString().split("T")[0]
          : "",
      remark: selectedItems?.remark || "",
      type: selectedItems?.type || "",
      purpose: selectedItems?.purpose || "",
      status: selectedItems?.status || "",
    });
    setCatagory(curCat);
    setParticular(curPart);
    setSelectedBranches(
      selectedItems?.branches?.map((branch) => branch?.branch?.name) || []
    );
  }, [selectedItems, reset]);

  const handleClear = () => {
    reset({
      date: today(),
      remark: "",
      bank: "",
      purpose: "",
      status: "",
    });
    setSelectedBranches([]);
    setCatagory("Select Catagory");
    setParticular("Select Particular");
  };

  const onSubmit = async (data) => {
    const id = selectedItems?._id;
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
    data.type = "liability";

    try {
      setLoading(true);
      await apiClient.patch(`/liability/${id}`, data);
      toast.success("Successfully Edited");
      refreshLiability();
      refreshLedger();
      refreshDashboardTotals();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-head-text">Liability Edit Form</h2>
      <div className="form-section">
        <CatagorySelector
          catagory={catagory}
          setCatagory={setCatagory}
          particular={particular}
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
        defaultAmounts={defaultAmounts}
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

export default LiabilityEditForm;
