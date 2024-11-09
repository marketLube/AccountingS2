import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";

export default function useReminders() {
  let endpoint = `/reminders`;
  const {
    data: reminders,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });
  return { isLoading, isError, error, refetch, reminders };
}
export function refreshReminders() {
  queryClient.invalidateQueries("reminders");
}
