import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";

export default function useAssets() {
  let endpoint = `/assets?`;
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
  console.log(assets, "assets");
  return { isLoading, isError, error, refetch, assets };
}
export function refreshAssets() {
  queryClient.invalidateQueries("assets");
}
