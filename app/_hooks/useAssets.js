import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useAssets() {
  let endpoint = `/assets`;
  const {
    data: assets,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });
  return { isLoading, isError, error, refetch, assets };
}
