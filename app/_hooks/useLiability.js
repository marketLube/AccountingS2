import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import {
  setLiabilityCurParticular,
  setLiabilityParticular,
  setLiabilitySummery,
} from "@/lib/slices/liabilitySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useBankIdFinder,
  useBranchIdFinder,
  useCategoryNameFinder,
  useParticularNameFinder,
} from "../_services/finders";
import useCatToParticular from "./useCatToParticular";
import { useEffect } from "react";

export function useLiability() {
  const dispatch = useDispatch();
  const { curBranch, curCat, curParticular, page } = useSelector(
    (state) => state.liability
  );

  const branchId = useBranchIdFinder(curBranch)?._id;
  const catagory = useCategoryNameFinder(curCat);
  const particular = useParticularNameFinder(curParticular);

  useCatToParticular(
    catagory,
    setLiabilityParticular,
    setLiabilityCurParticular
  );
  let endpoint = `/liability?type=liability?page=${page}`;

  if (branchId) {
    endpoint += `&branchId=${branchId}`;
  }
  if (catagory?._id) {
    endpoint += `&catagory=${catagory?._id}`;
  }
  if (particular?._id) {
    endpoint += `&particular=${particular?._id}`;
  }

  const {
    data: liabilities,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["liability", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data.data),
  });

  useEffect(() => {
    dispatch(setLiabilitySummery(liabilities?.summery));
  }, [liabilities]);

  return { isLoading, isError, error, refetch, liabilities: liabilities?.data };
}
export function refreshLiability() {
  queryClient.invalidateQueries("liability");
}

export function liabilityRefreshers() {
  refreshLiability();
}
