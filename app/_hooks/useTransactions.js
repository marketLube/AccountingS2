import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { queryClient } from "../_components/layouts/AppLayout";
import { useBranchIdFinder } from "../_services/finders";

export default function useTransactions() {
  const { type, curBranch } = useSelector((state) => state.daybook);
  const branchId = useBranchIdFinder(curBranch)?._id;
  console.log(curBranch, "curbranch");
  console.log(branchId, "brachId");
  let endpoint = `/transaction?`;

  if (type !== "All Status") {
    endpoint += `type=${type}`;
  }
  if (branchId) {
    endpoint += `&branchId=${branchId}`;
  }

  const {
    data: transactions,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactions", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });

  return { isLoading, isError, error, refetch, transactions };
}

export function refreshTransaction() {
  queryClient.invalidateQueries("transactions");
}

export function transactionRefreshers() {
  refreshTransaction();
}
