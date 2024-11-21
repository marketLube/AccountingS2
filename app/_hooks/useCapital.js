import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useBranchIdFinder } from "../_services/finders";
import { useEffect } from "react";
import { setCapitalSummery } from "@/lib/slices/capitalSlice";

export default function useCapitals() {
  const dispatch = useDispatch();

  const { curBranch, page, curType } = useSelector((state) => state.capital);
  const capitalCurBranch = useBranchIdFinder(curBranch);

  let endpoint = `/capital?page=${page}`;

  if (capitalCurBranch) {
    endpoint += `&branch=${capitalCurBranch?._id}`;
  }
  if (!curType.startsWith("All")) {
    endpoint += `&type=${curType}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["capital", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  useEffect(() => {
    dispatch(setCapitalSummery(data?.summery));
  }, [data]);

  return { isLoading, isError, error, refetch, capital: data?.data };
}
export function refreshCapital() {
  queryClient.invalidateQueries("capital");
}
