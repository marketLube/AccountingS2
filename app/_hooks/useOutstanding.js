import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useOutstanding() {
  let endpoint = `/liabiliy?type=outstanding`;
  const {
    data: transactions,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["outstanding"],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });
  return { isLoading, isError, error, refetch, transactions };
}
