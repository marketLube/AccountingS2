"use client";
import { useForm } from "react-hook-form";
import {
  Amount,
  Property,
  BranchSelector,
  ExistingProperty,
} from "../_FormComponents/FormSmallComponents";
import { useState } from "react";
import Button from "../../utils/Button";
import apiClient from "@/lib/axiosInstance";
import toast from "react-hot-toast";
import { refreshBudgetPlanner } from "@/app/_hooks/useBudgetPlanner";
import { branchFinder } from "@/app/_services/finders";
import { useSelector } from "react-redux";

// Main Form Component
function BudgetplannerNewEntryForm() {
  const [loading, setLoading] = useState(false);
  const { branches } = useSelector((state) => state.general);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      property: "",
      existingProperty: "",
      amount: "",
      branch: "",
    },
  });

  // Watch both property fields
  const propertyValue = watch("property");
  const existingPropertyValue = watch("existingProperty");

  // Determine which field should be disabled
  const isPropertyDisabled = !!existingPropertyValue;
  const isExistingPropertyDisabled = !!propertyValue;

  const onSubmit = async (data) => {
    // Use either property or existingProperty
    const propertyToUse = data.property || data.existingProperty;

    const branch = branchFinder(data.branch, branches);
    if (!branch) return toast.error("Something went wrong..");
    data.branch = branch?._id;

    if (!propertyToUse) {
      return toast.error("Please select or enter a property");
    }

    try {
      setLoading(true);
      await apiClient.post("/event", {
        ...data,
        property: propertyToUse,
      });
      toast.success("Successfully created new Event");
      refreshBudgetPlanner();
      reset();
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "An error occurred");
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
        Budget Planner New Entry Form
      </h2>
      <div className="form-section">
        <div className="form-row">
          <Property
            register={register}
            errors={errors}
            isDisabled={isPropertyDisabled}
          />
          <ExistingProperty
            register={register}
            errors={errors}
            isDisabled={isExistingPropertyDisabled}
          />
        </div>
        <div className="form-row">
          <Amount register={register} errors={errors} />
          <BranchSelector register={register} errors={errors} />
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

export default BudgetplannerNewEntryForm;
