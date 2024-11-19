"use client";

import useDashboardTotals from "@/app/_hooks/useDashboard";
import {
  fetchBanks,
  fetchBranches,
  fetchCategory,
} from "@/lib/slices/generalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Main({ children }) {
  const dispatch = useDispatch();
  useDashboardTotals();
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBranches());
    dispatch(fetchBanks());
  }, [dispatch]);

  return <main className="main">{children}</main>;
}

export default Main;
