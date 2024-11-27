import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import apiClient from "@/lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useBranchIdFinder } from "../_services/finders";
import { useEffect } from "react";
import { setAssetsSummery } from "@/lib/slices/assetsSlice";

export default function useAssets() {
  const dispatch = useDispatch();

  const { curBranch, page, curType, startDate, endDate, query } = useSelector(
    (state) => state.assets
  );

  const assetsCurbranch = useBranchIdFinder(curBranch);

  let endpoint = `/assets?page=${page}&sort=-date`;

  if (assetsCurbranch) {
    endpoint += `&branch=${assetsCurbranch?._id}`;
  }
  if (!curType.startsWith("All")) {
    endpoint += `&type=${curType}`;
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
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["assets", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  useEffect(() => {
    dispatch(setAssetsSummery(data?.summery));
  }, [data, dispatch]);

  return { isLoading, isError, error, refetch, assets: data?.data };
}

export function refreshAssets() {
  queryClient.invalidateQueries("assets");
}
