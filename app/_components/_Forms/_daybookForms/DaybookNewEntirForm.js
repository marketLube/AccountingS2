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
import { today } from "@/app/_services/helpers";
import { useEffect, useState } from "react";
import Button from "../../utils/Button";
import CatagorySelector from "../../utils/CatagorySelector";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/axiosInstance";
import { bankIdFiner, catIdFinder, parIdFinder } from "@/app/_services/finders";
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

function DaybookNewEntirForm() {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { categories, particulars, banks } = useSelector(
    (state) => state.general
  );
  const { branches } = useSelector((state) => state.general);

  const [catagory, setCatagory] = useState("Select Catagory");
  const [particular, setParticular] = useState("Select Particular");
  const [amount, setAmount] = useState("");
  const [isBalanceEffect, setIsBalanceEffect] = useState(false);

  const defaultValues = {
    date: today(),
    remark: "Something",
    bank: "",
    type: "",
    purpose: "New",
    tds: "10%",
    gstPercent: "2%",
    gstType: "excl",
    tdsType: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    watch,
  } = useForm({
    defaultValues,
  });

  const tdsValue = watch("tds");
  const gstValue = watch("gstPercent");
  const data = watch();

  const handleBalanceEffect = (val) => {
    return () => setIsBalanceEffect(val);
  };
  console.log(isBalanceEffect, "bal effect");
  useEffect(() => {
    let amount = selectedBranches.reduce((acc, val) => {
      if (!data[val]) return acc;
      return acc + parseFloat(data[val]);
    }, 0);

    let tdsDeduction = 0;
    if (tdsValue !== "0%" && tdsValue) {
      const tdsRate = parseFloat(tdsValue) / 100;
      tdsDeduction = amount * tdsRate;
    }

    let gstAmount = 0;
    if (data.gstType === "excl" && gstValue !== "0%") {
      const gstRate = parseFloat(data.gstPercent || 0) / 100;
      gstAmount = amount * gstRate;
    }
    const calculatedAmt = amount - tdsDeduction + gstAmount;
    setAmount(calculatedAmt);
  }, [data]);

  const handleClear = () => {
    reset(defaultValues);
    setSelectedBranches([]);
    setCatagory("Select Catagory");
    setParticular("Select Particular");
  };

  const onSubmit = async (data) => {
    if (selectedBranches.length <= 0)
      return toast.error("Please Select atleast one branch");

    let amount = selectedBranches.reduce((acc, val) => {
      if (!data[val]) return acc;
      return acc + parseFloat(data[val]);
    }, 0);

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

    if (isBalanceEffect && data.gstPercent && data.gstType === "excl") {
      data.isGstDeduct = true;
      const gstRate = parseFloat(data.gstPercent || 0) / 100;
      data.gstAmount = amount * gstRate;
    } else {
      data.isGstDeduct = false;
      data.gstAmount = 0;
    }

    console.log(data, "data");

    try {
      setLoading(true);
      await apiClient.post("/transaction", data);
      toast.success("Successfully created new Transaction");
      refreshTransaction();
      refreshDashboardTotals();
      refreshDashboardChartData();
      refreshBranchWiseChart();
      refreshBranchWiseCircle();
      dispatch(fetchBanks());
      refreshBalanceSheet();
      refreshLedger();
      handleClear();
      setSelectedBranches([]);
      setCatagory([]);
      setParticular([]);
      refreshGstTotals();
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }

    return;
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-head-text">Daybook New Entry Form</h2>

      <div className="form-catagory-container">
        <Catagory
          setCatagory={setCatagory}
          setParticular={setParticular}
          particular={particular}
          catagory={catagory}
        />

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
      <div className="form-btn-group form-submit-btns relative">
        <Button type="clear" onClick={handleClear}>
          Clear
        </Button>
        <Button
          type="submit"
          style={loading ? { opacity: 0.5 } : {}}
          className="btn primary-blue-btn form-submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>

        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-2 text-sm font-medium text-gray-700"
          aria-label="Total amount for the transaction"
        >
          Amount : {amount || 0}
        </div>
      </div>
    </form>
  );
}

export default DaybookNewEntirForm;
