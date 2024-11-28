"use client";

import useAssets from "@/app/_hooks/useAssets";
import useBranchWise from "@/app/_hooks/useBranchwise";
import useBudgetPlanner from "@/app/_hooks/useBudgetPlanner";
import useCapitals from "@/app/_hooks/useCapital";
import useDashboardTotals from "@/app/_hooks/useDashboard";
import useLedgers from "@/app/_hooks/useLedgers";
import { useLiability } from "@/app/_hooks/useLiability";
import useOutstanding from "@/app/_hooks/useOutstanding";
import useReminders from "@/app/_hooks/useReminders";
import useTransactions from "@/app/_hooks/useTransactions";
import { clearCookie } from "@/app/_services/smallHelpers";
import {
  fetchBanks,
  fetchBranches,
  fetchCategory,
} from "@/lib/slices/generalSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Main({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBranches());
    dispatch(fetchBanks());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  return <main className="main">{children}</main>;
}

export default Main;
