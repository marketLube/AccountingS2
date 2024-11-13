import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";
import { useSelector } from "react-redux";
import { useBranchIdFinder } from "../_services/finders";

export default function useAssets() {
  let endpoint = `/assets?`;
  const { curBranch } = useSelector((state) => state.branchwise);
  const assetsCurbranch = useBranchIdFinder(curBranch);
  console.log(curBranch, "ufkfg");

  if (assetsCurbranch) {
    endpoint += `branchId=${assetsCurbranch?._id}`;
  }
  const {
    data: assets,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["assets", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });

  return { isLoading, isError, error, refetch, assets };
}
export function refreshAssets() {
  queryClient.invalidateQueries("assets");
}
