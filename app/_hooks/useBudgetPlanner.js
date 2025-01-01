import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setBudgetPlannerSummery,
  setPropertyNames,
} from "@/lib/slices/budgetplannerSlice";
import { useBranchIdFinder } from "../_services/finders";

export default function useBudgetPlanner() {
  const { page, curBranch, summery, startDate, endDate, query } = useSelector(
    (state) => state.budgetplanner
  );
  const branch = useBranchIdFinder(curBranch);

  const dispatch = useDispatch();

  let endpoint = `/event?page=${page}?&sort=-date`;
  console.log(endpoint, "enpoint");

  if (branch) {
    endpoint += `&branch=${branch?._id}`;
  }
  if (startDate) {
    endpoint += `&startDate=${startDate}`;
  }
  if (endDate) {
    endpoint += `&endDate=${endDate}`;
  }
  if (query) {
    endpoint += `&search=${query}`;
  }
  const {
    data: events,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  useEffect(() => {
    const eventNames = events?.data?.map((event) => event?.property);
    const uniqueNames = new Set(eventNames);
    dispatch(setPropertyNames([...uniqueNames]));
    dispatch(setBudgetPlannerSummery(events?.summery));
  }, [events, dispatch]);

  return { isLoading, isError, error, refetch, events: events?.data };
}
export function refreshBudgetPlanner() {
  queryClient.invalidateQueries("events");
}
