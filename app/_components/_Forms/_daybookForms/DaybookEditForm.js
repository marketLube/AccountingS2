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
  TdsPercent,
} from "../_FormComponents/FormSmallComponents";
import { useEffect, useState, useMemo } from "react";
import Button from "../../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import {
  bankFinder,
  bankIdFiner,
  parIdFinder,
  useCategoryFinder,
  useParticularFinder,
} from "@/app/_services/finders";
import toast from "react-hot-toast";
import {
  refreshGstTotals,
  refreshTransaction,
} from "@/app/_hooks/useTransactions";
import {
  refreshDashboardChartData,
  refreshDashboardTotals,
} from "@/app/_hooks/useDashboard";
import {
  refreshBranchWiseChart,
  refreshBranchWiseCircle,
} from "@/app/_hooks/useBranchwise";
import { fetchBanks } from "@/lib/slices/generalSlice";
import {
  refreshBalanceSheet,
  refreshBalanceSheetAll,
} from "@/app/_hooks/useBalanceSheet";
import { refreshLedger } from "@/app/_hooks/useLedgers";
import Catagory from "../../CatagorySelector/Catagory";

function DaybookEditForm() {
  const { selectedItems } = useSelector((state) => state.daybook);

  const dispatch = useDispatch();

  const [selectedBranches, setSelectedBranches] = useState(
    selectedItems?.branches?.map((branch) => branch?.branchName) || []
  );

  const [defaultAmounts, setDefaultAmounts] = useState(
    selectedItems?.branches?.map((branch) => branch?.amount) || []
  );

  const [loading, setLoading] = useState(false);

  const { categories, particulars, banks, branches } = useSelector(
    (state) => state.general
  );

  const curCat = useCategoryFinder(selectedItems?.catagory)?.name;
  const curPart = useParticularFinder(selectedItems?.particular)?.name;
  const curBank = bankFinder(selectedItems?.bank, banks);

  const [catagory, setCatagory] = useState(selectedItems?.catagory);
  const [particular, setParticular] = useState(curPart);
  const [isBalanceEffect, setIsBalanceEffect] = useState(
    selectedItems?.isGstDeduct
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    clearErrors,
  } = useForm();

  const tdsValue = watch("tds");
  const gstValue = watch("gstPercent");
  const watchedData = watch();

  // Improved calculation function with memoization
  const calculateTotalAmount = useMemo(() => {
    return (baseAmount, tdsValue, gstValue, gstType) => {
      let finalAmount = baseAmount;

      // TDS Deduction
      if (tdsValue && tdsValue !== "0%") {
        const tdsRate = parseFloat(tdsValue) / 100;
        finalAmount -= baseAmount * tdsRate;
      }

      // GST Calculation
      if (gstType === "excl" && gstValue && gstValue !== "0%") {
        const gstRate = parseFloat(gstValue) / 100;
        finalAmount += baseAmount * gstRate;
      }

      return finalAmount;
    };
  }, []);

  // Calculate initial total amount when form loads
  const initialTotalAmount = useMemo(() => {
    if (!selectedItems?.branches) return 0;

    const initialAmount = selectedItems.branches.reduce(
      (acc, branch) => acc + (branch?.amount || 0),
      0
    );

    return calculateTotalAmount(
      initialAmount,
      selectedItems.tds,
      selectedItems.gstPercent,
      selectedItems.gstType
    );
  }, [selectedItems, calculateTotalAmount]);

  // Calculate total amount based on branch inputs
  const totalAmount = useMemo(() => {
    const branchAmounts = selectedBranches.reduce((acc, branchName) => {
      const branchAmount = parseFloat(watchedData[branchName] || 0);
      return acc + branchAmount;
    }, 0);

    return calculateTotalAmount(
      branchAmounts,
      watchedData.tds,
      watchedData.gstPercent,
      watchedData.gstType
    );
  }, [selectedBranches, watchedData, calculateTotalAmount]);

  useEffect(() => {
    // Reset form values based on the latest selectedItems
    reset({
      date:
        selectedItems?.date && !isNaN(new Date(selectedItems.date))
          ? new Date(selectedItems.date).toISOString().split("T")[0]
          : "",
      remark: selectedItems?.remark || "",
      bank: selectedItems?.bank || "",
      type: selectedItems?.type || "",
      purpose: selectedItems?.purpose || "",
      tds: selectedItems?.tds || "",
      tdsType: selectedItems?.tdsType || "",
      gstPercent: String(selectedItems?.gstPercent || 0) + "%",
      gstType: selectedItems?.gstType || "",
    });
    setCatagory(selectedItems?.catagory);
    setParticular(curPart);
    setSelectedBranches(
      selectedItems?.branches?.map((branch) => branch?.branchName) || []
    );
    setDefaultAmounts(
      selectedItems?.branches?.map((branch) => branch?.amount) || []
    );
    setIsBalanceEffect(selectedItems?.isGstDeduct);
  }, [selectedItems, reset, curBank, curPart]);

  const onSubmit = async (data) => {
    try {
      if (selectedBranches.length <= 0)
        return toast.error("Please Select atleast one branch");

      const branchObjects = selectedBranches.map((branch) => {
        const branchObj = branches.find(
          (branchObjs) => branchObjs.name === branch
        );

        return {
          branch: branchObj._id,
          amount: parseFloat(data[branchObj.name] || 0),
        };
      });

      data.branches = branchObjects;
      data.catagory = catagory;
      data.particular = parIdFinder(particulars, particular);
      data.bank = bankIdFiner(banks, data.bank);
      data.gstPercent = parseFloat(data.gstPercent || 0);

      if (!data.gstType) data.gstType = "no-gst";
      if (!data.tdsType) data.tdsType = "no tds";

      console.log(data, "data");

      setLoading(true);

      // Handle GST Amount
      if (isBalanceEffect) {
        data.isGstDeduct = true;
        const gstRate = parseFloat(data.gstPercent || 0) / 100;
        const totalBranchAmount = branchObjects.reduce(
          (acc, branch) => acc + branch.amount,
          0
        );
        data.gstAmount = Math.abs(totalBranchAmount * gstRate);
      } else {
        data.isGstDeduct = false;
        data.gstAmount = 0;
      }

      await apiClient.patch(`/transaction/${selectedItems?._id}`, data);
      toast.success("Successfully Edited");

      // Refresh various data
      [
        refreshTransaction,
        refreshDashboardTotals,
        refreshDashboardChartData,
        refreshBranchWiseChart,
        refreshBranchWiseCircle,
        () => dispatch(fetchBanks()),
        refreshBalanceSheet,
        refreshLedger,
        refreshGstTotals,
        refreshBalanceSheetAll,
      ].forEach((fn) => fn());
    } catch (e) {
      console.error(e);
      toast.error(e.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    reset({
      date: "",
      remark: "",
      bank: "",
      type: "",
      purpose: "",
      tds: "",
      gstPercent: "",
      gstType: "",
    });
    setSelectedBranches([]);
    setCatagory("Select Catagory");
    setParticular("Select Particular");
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-head-text">Daybook Edit Form</h2>
      <div className="form-catagory-container">
        <Catagory
          setCatagory={setCatagory}
          setParticular={setParticular}
          particular={particular}
          catagory={catagory}
          defaultValue={curCat}
          defaultParticular={curPart}
        />
      </div>
      <div className="form-section">
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
        defaultAmounts={defaultAmounts}
      />
      <div className="form-row">
        <Tds register={register} errors={errors} />
        <TdsPercent
          register={register}
          errors={errors}
          disabled={tdsValue === "0%"}
        />
        <Gst
          register={register}
          errors={errors}
          disabled={gstValue === "0%"}
          isBalanceEffect={isBalanceEffect}
          setIsBalanceEffect={setIsBalanceEffect}
        />
        <GstPercent register={register} errors={errors} />
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

        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-2 text-sm font-medium text-gray-700 mb-14"
          aria-label="Total amount for the transaction"
        >
          Amount: {(totalAmount || initialTotalAmount).toFixed(2)}
        </div>
      </div>
    </form>
  );
}

export default DaybookEditForm;
