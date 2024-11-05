import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

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
