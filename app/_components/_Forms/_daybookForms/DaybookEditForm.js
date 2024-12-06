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
import { useEffect, useState } from "react";
import Button from "../../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import {
  bankFinder,
  bankIdFiner,
  catIdFinder,
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
import { refreshBalanceSheet } from "@/app/_hooks/useBalanceSheet";
import { refreshLedger } from "@/app/_hooks/useLedgers";
import Catagory from "../../CatagorySelector/Catagory";

function DaybookEditForm() {
  const { selectedItems } = useSelector((state) => state.daybook);

  const dispatch = useDispatch();

  const [selectedBranches, setSelectedBranches] = useState(
    selectedItems?.branches?.map((branch) => branch?.branch?.name) || []
  );
  const defaultAmounts = selectedItems?.branches?.map(
    (branch) => branch?.branchTotalAmt
  );

  const [loading, setLoading] = useState(false);

  const { categories, particulars, banks, branches } = useSelector(
    (state) => state.general
  );

  const curCat = useCategoryFinder(selectedItems?.catagory)?.name;
  const curPart = useParticularFinder(selectedItems?.particular)?.name;
  const curBank = bankFinder(selectedItems?.bank, banks);

  const [catagory, setCatagory] = useState(curCat);
  const [particular, setParticular] = useState(curPart);
  const [amount, setAmount] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
    clearErrors,
  } = useForm();

  useEffect(() => {
    // Reset form values based on the latest selectedItems
    reset({
      date:
        selectedItems?.date && !isNaN(new Date(selectedItems.date))
          ? new Date(selectedItems.date).toISOString().split("T")[0]
          : "", // Handle invalid or missing date
      remark: selectedItems?.remark || "",
      bank: curBank || "",
      type: selectedItems?.type || "",
      purpose: selectedItems?.purpose || "",
      tds: selectedItems?.tds || "",
      tdsType: selectedItems?.tdsType || "",
      gstPercent: String(selectedItems?.gstPercent) + "%" || "",
      gstType: selectedItems?.gstType || "",
    });
    setCatagory(curCat);
    setParticular(curPart);
    setSelectedBranches(
      selectedItems?.branches?.map((branch) => branch?.branch?.name) || []
    );
  }, [selectedItems, reset]);

  const tdsValue = watch("tds");
  const gstValue = watch("gstPercent");
  const data = watch();

  useEffect(() => {
    let amount = selectedBranches.reduce((acc, val) => {
      if (!data[val]) return acc;
      return acc + parseFloat(data[val]);
    }, 0);

    if (tdsValue !== "0%" && tdsValue) {
      const tdsRate = parseFloat(tdsValue) / 100;
      const tdsDeduction = amount * tdsRate;
      amount = amount - tdsDeduction;
      setAmount(amount);
    } else {
      setAmount(amount);
    }
  }, [data]);

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
          amount: parseFloat(data[branchObj.name]),
        };
      });

      data.branches = branchObjects;
      data.catagory = catagory;
      data.particular = parIdFinder(particulars, particular);
      data.bank = bankIdFiner(banks, data.bank);
      data.gstPercent = parseFloat(data.gstPercent);

      if (!data.gstType) data.gstType = "no-gst";
      if (!data.tdsType) data.tdsType = "no tds";

      setLoading(true);

      const res = await apiClient.patch(
        `/transaction/${selectedItems._id}`,
        data
      );

      toast.success("Successfully Edited");
      refreshTransaction();
      refreshDashboardTotals();
      refreshDashboardChartData();
      refreshBranchWiseChart();
      refreshBranchWiseCircle();
      dispatch(fetchBanks());
      refreshBalanceSheet();
      refreshGstTotals();
      refreshLedger();
    } catch (e) {
      console.log(e, "ee");
      toast.error(e);
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
          defaultParticular={particular}
          defaultValue={catagory}
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
        <Gst register={register} errors={errors} disabled={gstValue === "0%"} />
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
          Amount : {amount || 0}
        </div>
      </div>
    </form>
  );
}

export default DaybookEditForm;
