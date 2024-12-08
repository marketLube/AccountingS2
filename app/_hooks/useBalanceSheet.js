import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";

export function useBalanceSheet() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["balancesheet"],
    queryFn: () =>
      apiClient
        .get("/stats/balance-sheet")
        .then((res) => res.data.formattedResult),
  });

  return { data, isError, isLoading };
}

export function useGstBalanceSheet() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["gst-balance-sheet"],
    queryFn: () => apiClient.get("/stats/gst").then((res) => res.data.results),
  });

  return { data, isError, isLoading };
}

export function refreshGstBalanceSheet() {
  queryClient.invalidateQueries("gst-balance-sheet");
}
export function refreshBalanceSheet() {
  queryClient.invalidateQueries("balancesheet");
}

export function refreshBalanceSheetAll() {
  refreshGstBalanceSheet();
  refreshBalanceSheet();
}
