import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { queryClient } from "../_components/layouts/AppLayout";
import {
  useBankIdFinder,
  useBranchIdFinder,
  useCategoryNameFinder,
  useParticularNameFinder,
} from "../_services/finders";

import {
  resetDaybookPages,
  setDaybookCurParticular,
  setDaybookCurrentPage,
  setDaybookParticular,
  setDaybookSummery,
} from "@/lib/slices/daybookSlice";
import useCatToParticular from "./useCatToParticular";
import { useEffect, useRef } from "react";

export default function useTransactions() {
  const dispatch = useDispatch();
  const {
    type,
    curBranch,
    curCat,
    curParticular,
    curBank,
    page,
    startDate,
    gstFilter,
    endDate,
    query,
  } = useSelector((state) => state.daybook);
  const branchId = useBranchIdFinder(curBranch)?._id;
  const catagory = useCategoryNameFinder(curCat);

  const particular = catagory?.particulars?.find(
    (obj) => obj.name === curParticular
  );

  const bank = useBankIdFinder(curBank);

  useCatToParticular(catagory, setDaybookParticular, setDaybookCurParticular);

  let endpoint = `/transaction?page=${page}&sort=-date -createdAt`;

  if (type !== "All Status") {
    endpoint += `&type=${type}`;
  }
  if (!gstFilter?.startsWith("All")) {
    endpoint += `&gstType=${gstFilter}`;
  }
  if (branchId) {
    endpoint += `&branchId=${branchId}`;
  }
  if (catagory?._id) {
    endpoint += `&catagory=${catagory?._id}`;

    if (particular?._id) {
      endpoint += `&particular=${particular?._id}`;
    }
  }

  if (bank?._id) {
    endpoint += `&bank=${bank?._id}`;
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

  const {
    data: transactions,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactions", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  useEffect(() => {
    dispatch(setDaybookSummery(transactions?.summery));
  }, [transactions, dispatch]);

  return {
    isLoading,
    isError,
    error,
    refetch,
    transactions: transactions?.data,
  };
}
export function useGstTotals() {
  const {
    type,
    curBranch,
    curCat,
    curParticular,
    curBank,
    startDate,
    endDate,
    query,
  } = useSelector((state) => state.daybook) || {};

  const branchId = useBranchIdFinder(curBranch)?._id || null;
  const catagory = useCategoryNameFinder(curCat) || {};
  const particular = useParticularNameFinder(curParticular) || {};
  const bank = useBankIdFinder(curBank) || {};

  let endpoint = "/stats/gst?limit=500";

  if (type && type !== "All Status") endpoint += `&type=${type}`;
  if (branchId) endpoint += `&branchId=${branchId}`;
  if (catagory._id) endpoint += `&catagory=${catagory._id}`;
  if (particular._id) endpoint += `&particular=${particular._id}`;
  if (bank._id) endpoint += `&bank=${bank._id}`;
  if (startDate) endpoint += `&startDate=${startDate}`;
  if (endDate) endpoint += `&endDate=${endDate}`;
  if (query.trim()) endpoint += `&search=${query}`;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["gst", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.results),
  });

  return {
    isLoading,
    isError,
    error,
    refetch,
    data,
  };
}

export function refreshGstTotals() {
  queryClient.invalidateQueries("gst");
}
export function refreshTransaction() {
  queryClient.invalidateQueries("transactions");
}
export function transactionRefreshers() {
  refreshTransaction();
}
