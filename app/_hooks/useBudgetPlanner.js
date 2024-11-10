import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPropertyNames } from "@/lib/slices/budgetplannerSlice";

export default function useBudgetPlanner() {
  const dispatch = useDispatch();
  let endpoint = `/event?limit=1000`;
  const {
    data: events,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });

  useEffect(() => {
    const eventNames = events?.map((event) => event?.property);
    const uniqueNames = new Set(eventNames);
    dispatch(setPropertyNames([...uniqueNames]));
  }, [events]);

  return { isLoading, isError, error, refetch, events };
}
export function refreshBudgetPlanner() {
  queryClient.invalidateQueries("events");
}
