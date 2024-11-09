import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { queryClient } from "../_components/layouts/AppLayout";
import { useBranchIdFinder } from "../_services/finders";

export default function useBranchWise() {
  const { curBranch } = useSelector((state) => state.branchwise);
  const branchWiseCurBranch = useBranchIdFinder(curBranch);

  let endpoint = `/transaction?`;

  if (branchWiseCurBranch) {
    endpoint += `branchId=${branchWiseCurBranch?._id}`;
  }

  const {
    data: branchwiseTrans,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["branchwise", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });

  return { isLoading, isError, error, refetch, branchwiseTrans };
}

export function refreshBranchwise() {
  queryClient.invalidateQueries("branchwise");
}
