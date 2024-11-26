"use client";

import useDashboardTotals from "@/app/_hooks/useDashboard";
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
  useDashboardTotals();
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBranches());
    dispatch(fetchBanks());
  }, [dispatch]);

  useEffect(() => {
    console.log(isLoggedIn, "login");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  return <main className="main">{children}</main>;
}

export default Main;
