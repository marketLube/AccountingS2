import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";

export default function useInvoice() {
  let endpoint = `/invoice?`;

  const {
    data: invoice,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["invoice", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });

  return { isLoading, isError, error, refetch, invoice };
}
export function refreshInvoice() {
  queryClient.invalidateQueries("invoice");
}
