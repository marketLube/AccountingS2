import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";
import { useSelector } from "react-redux";

export default function useDashboardTotals() {
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

  return { isLoading, isError, error, refetch, totals };
}
export function refreshDashboardTotals() {
  queryClient.invalidateQueries("totals");
}
