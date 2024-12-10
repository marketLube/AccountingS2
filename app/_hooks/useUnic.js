import apiClient from "@/lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { queryClient } from "../_components/layouts/AppLayout";
import { setCommitionSummery } from "@/lib/slices/CommissionSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useUniv() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.commission);

  let endpoint = `/university?page=${page}&sort=-date`;

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
