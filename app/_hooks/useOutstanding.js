import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";

export default function useOutstanding() {
  let endpoint = `/liability?type=outstanding`;
  const {
    data: outstandings,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["outstanding", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });
  return { isLoading, isError, error, refetch, outstandings };
}
export function refreshOutstanding() {
  queryClient.invalidateQueries("outstanding");
}
