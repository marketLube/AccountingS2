import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useBranchIdFinder } from "../_services/finders";
import { useEffect } from "react";
import { setAssetsSummery } from "@/lib/slices/assetsSlice";

export default function useAssets() {
  const dispatch = useDispatch();

  const { curBranch, page, curType } = useSelector((state) => state.assets);

  const assetsCurbranch = useBranchIdFinder(curBranch);

  let endpoint = `/assets?page=${page}`;

  if (assetsCurbranch) {
    endpoint += `&branch=${assetsCurbranch?._id}`;
  }
  if (!curType.startsWith("All")) {
    endpoint += `&type=${curType}`;
  }
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["assets", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  useEffect(() => {
    dispatch(setAssetsSummery(data?.summery));
  }, [data]);

  return { isLoading, isError, error, refetch, assets: data?.data };
}

export function refreshAssets() {
  queryClient.invalidateQueries("assets");
}
