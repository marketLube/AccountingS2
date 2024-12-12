import apiClient from "@/lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { queryClient } from "../_components/layouts/AppLayout";
import { setCommitionSummery } from "@/lib/slices/CommissionSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useBranchIdFinder } from "../_services/finders";

export default function useUniv() {
  const dispatch = useDispatch();
  const { page, curStatus, curBranch } = useSelector(
    (state) => state.commission
  );

  console.log(curStatus, "curSTat");

  const branchId = useBranchIdFinder(curBranch);

  let endpoint = `/university?page=${page}&sort=-date`;

  if (!curStatus?.startsWith("All")) {
    endpoint += `&status=${curStatus}`;
  }
  if (branchId) {
    endpoint += `&branch=${curBranch}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["commition", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  useEffect(() => {
    dispatch(setCommitionSummery(data?.summery));
  }, [data, dispatch]);

  return { isLoading, isError, error, refetch, data: data?.data };
}
export function refreshUniv() {
  queryClient.invalidateQueries("commition");
}
