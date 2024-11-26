import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setDataset } from "@/lib/slices/dashboardSlice";
import { useEffect } from "react";
import { setTotals } from "@/lib/slices/generalSlice";

export default function useDashboardTotals() {
  const dispatch = useDispatch();
  let endpoint = `/stats/totals?thisMonth=yes`;

  const { isAllTime } = useSelector((state) => state.dashboard);

  if (isAllTime) {
    endpoint = "/stats/totals";
  }

  const {
    data: totals,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["totals", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.result),
  });

  useEffect(() => {
    dispatch(setTotals(totals));
  }, [totals, dispatch]);

  return { isLoading, isError, error, refetch, totals };
}

export function useDashboardChart() {
  const dispatch = useDispatch();
  let endpoint = `/stats/branchwise-total?thisMonth=yes`;
  const { isAllTime } = useSelector((state) => state.dashboard);

  if (isAllTime) {
    endpoint = "/stats/branchwise-total";
  }

  const {
    data: chartData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["chartData", endpoint],
    queryFn: () =>
      apiClient.get(endpoint).then((res) => res.data.data.branches),
  });

  useEffect(() => {
    console.log(chartData, "data");
    dispatch(setDataset(chartData));
  }, [chartData]);

  return { isLoading, isError, error, refetch, chartData };
}

export function refreshDashboardTotals() {
  queryClient.invalidateQueries("totals");
}

export function refreshDashboardChartData() {
  queryClient.invalidateQueries("chartData");
}
