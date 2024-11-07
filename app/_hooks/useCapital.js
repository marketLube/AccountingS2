import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useCapitals() {
  let endpoint = `/capital`;
  const {
    data: capital,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["capital"],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });
  return { isLoading, isError, error, refetch, capital };
}
