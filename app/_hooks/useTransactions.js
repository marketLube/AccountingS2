import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function useTransactions() {
  const { type } = useSelector((state) => state.daybook);

  let endpoint = `/transaction?`;

  if (type !== "All Status") {
    endpoint += `type=${type}`;
  }

  const {
    data: transactions,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactions", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });
  return { isLoading, isError, error, refetch, transactions };
}
