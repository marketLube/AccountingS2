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

export function refreshBalanceSheet() {
  queryClient.invalidateQueries("balancesheet");
}
