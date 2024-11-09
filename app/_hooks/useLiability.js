import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";

export function useLiability() {
  let endpoint = `/liability?type=liability`;

  const {
    data: liabilities,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["liability"],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });
  return { isLoading, isError, error, refetch, liabilities };
}
export function refreshLiability() {
  queryClient.invalidateQueries("liability");
}
