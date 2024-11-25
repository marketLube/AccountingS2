import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { queryClient } from "../_components/layouts/AppLayout";
import {
  useBankIdFinder,
  useBranchIdFinder,
  useCategoryNameFinder,
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
  }, [data]);
  return { isLoading, isError, error, refetch, branchwiseTrans: data?.data };
}

export function refreshBranchwise() {
  queryClient.invalidateQueries("branchwise");
}
