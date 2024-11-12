import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { queryClient } from "../_components/layouts/AppLayout";
import {
  useBankIdFinder,
  useBranchIdFinder,
  useCategoryNameFinder,
  useParticularNameFinder,
} from "../_services/finders";

import {
  setDaybookCurParticular,
  setDaybookParticular,
} from "@/lib/slices/daybookSlice";
import useCatToParticular from "./useCatToParticular";

export default function useTransactions() {
  const { type, curBranch, curCat, curParticular, curBank, page } = useSelector(
    (state) => state.daybook
  );
  const branchId = useBranchIdFinder(curBranch)?._id;
  const catagory = useCategoryNameFinder(curCat);
  const particular = useParticularNameFinder(curParticular);

  const bank = useBankIdFinder(curBank);

  useCatToParticular(catagory, setDaybookParticular, setDaybookCurParticular);

  let endpoint = `/transaction?page=${page}`;

  if (type !== "All Status") {
    endpoint += `type=${type}`;
  }
  if (branchId) {
    endpoint += `&branchId=${branchId}`;
  }
  if (catagory?._id) {
    endpoint += `&catagory=${catagory?._id}`;
  }
  if (particular?._id) {
    endpoint += `&particular=${particular?._id}`;
  }
  if (bank?._id) {
    endpoint += `&bank=${bank?._id}`;
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
