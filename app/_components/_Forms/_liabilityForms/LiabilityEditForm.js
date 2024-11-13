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
      date: new Date(selectedItems?.date) || "",
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
    data.type = "liability";

    try {
      await apiClient.patch("/liability", data);
      toast.success("Successfully created new Liability");
      refreshLiability();
      reset();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }

    return;
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <div className="form-row">
          <CatagorySelector catagory={catagory} setCatagory={setCatagory} />
          <ParticularSelector
            particular={particular}
            setParticular={setParticular}
          />
        </div>
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

export default LiabilityEditForm;