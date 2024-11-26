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
  setBranchwiseCurParticular,
  setBranchwiseParticular,
  setBranchWiseSummery,
} from "@/lib/slices/branchwiseSlice";
import { useEffect } from "react";
import useCatToParticular from "./useCatToParticular";

export default function useBranchWise() {
  const { curBranch, type, curCat, curParticular, curBank, page } = useSelector(
    (state) => state.branchwise
  );
  const dispatch = useDispatch();

  const branchId = useBranchIdFinder(curBranch)?._id;
  const catagory = useCategoryNameFinder(curCat);
  const particular = useParticularNameFinder(curParticular);
  const bank = useBankIdFinder(curBank);

  let endpoint = `/transaction?page=${page}`;

  useCatToParticular(
    catagory,
    setBranchwiseParticular,
    setBranchwiseCurParticular
  );

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

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["branchwise", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  useEffect(() => {
    dispatch(setBranchWiseSummery(data?.summery));
  }, [data, dispatch]);
  return { isLoading, isError, error, refetch, branchwiseTrans: data?.data };
}

export function useBranchWiseChart() {
  let endpoint = "/stats/yearly-pnl?";
  const { curBranch } = useSelector((state) => state.branchwise);
  const branchId = useBranchIdFinder(curBranch)?._id;

  if (branchId) {
    endpoint += `branch=${branchId}`;
  } else {
    endpoint += `branch=Kozhikode`;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["whole-year", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });

  return { isLoading, isError, data };
}
export function useBranchWiseCircle() {
  let endpoint = "/stats/branchwise-circle?";
  const { curBranch } = useSelector((state) => state.branchwise);
  const branchId = useBranchIdFinder(curBranch)?._id;

  if (branchId) {
    endpoint += `branch=${branchId}`;
  }

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["branchwise-circle", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.stats),
  });

  return { isLoading, isError, stats };
}

export function refreshBranchwise() {
  queryClient.invalidateQueries("branchwise");
}
export function refreshBranchWiseChart() {
  queryClient.invalidateQueries("whole-year");
}
export function refreshBranchWiseCircle() {
  queryClient.invalidateQueries("branchwise-circle");
}
