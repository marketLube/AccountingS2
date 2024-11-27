import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useCategoryNameFinder } from "../_services/finders";
import { useEffect } from "react";
import { setLedgerSummery } from "@/lib/slices/ledgerSlice";

export default function useLedgers() {
  const dispatch = useDispatch();

  const { page, curCat } = useSelector((state) => state.ledger);

  const catagory = useCategoryNameFinder(curCat);

  let endpoint = `/general?page=${page}`;

  if (catagory?._id) {
    endpoint += `&catagory=${catagory?._id}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["ledger", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  useEffect(() => {
    dispatch(setLedgerSummery(data?.summery));
  }, [data, dispatch]);

  return {
    isLoading,
    isError,
    error,
    refetch,
    ledger: data?.data?.particulars,
  };
}
export function refreshLedger() {
  queryClient.invalidateQueries("ledger");
}
