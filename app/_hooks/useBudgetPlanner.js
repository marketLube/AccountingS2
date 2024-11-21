import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPropertyNames } from "@/lib/slices/budgetplannerSlice";
import { useBranchIdFinder } from "../_services/finders";

export default function useBudgetPlanner() {
  const { page, curBranch } = useSelector((state) => state.budgetplanner);
  const branch = useBranchIdFinder(curBranch);

  const dispatch = useDispatch();
  let endpoint = `/event?page=${page}?`;

  if (branch) {
    endpoint += `&branch=${branch?._id}`;
  }
  const {
    data: events,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events", endpoint],
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
