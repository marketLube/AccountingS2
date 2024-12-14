import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import {
  setOutstandingCurParticular,
  setOutstandingParticular,
  setOutstandingSummery,
} from "@/lib/slices/outstandingSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCatToParticular from "./useCatToParticular";
import {
  useBranchIdFinder,
  useCategoryNameFinder,
  useParticularNameFinder,
} from "../_services/finders";

export default function useOutstanding() {
  const dispatch = useDispatch();

  const {
    curBranch,
    curCat,
    curParticular,
    page,
    curStatus,
    startDate,
    endDate,
    query,
  } = useSelector((state) => state.outstanding);
  const branchId = useBranchIdFinder(curBranch)?._id;
  const catagory = useCategoryNameFinder(curCat);
  const particular = catagory?.particulars?.find(
    (obj) => obj.name === curParticular
  );

  useCatToParticular(
    catagory,
    setOutstandingParticular,
    setOutstandingCurParticular
  );

  let endpoint = `/liability?type=outstanding&page=${page}&sort=-date`;

  if (branchId) {
    endpoint += `&branchId=${branchId}`;
  }
  if (catagory?._id) {
    endpoint += `&catagory=${catagory?._id}`;
  }
  if (particular?._id) {
    endpoint += `&particular=${particular?._id}`;
  }
  if (curStatus && !curStatus?.startsWith("All")) {
    endpoint += `&status=${curStatus}`;
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
    queryKey: ["outstanding", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  useEffect(() => {
    dispatch(setOutstandingSummery(data?.summery));
  }, [data, dispatch]);

  return { isLoading, isError, error, refetch, outstandings: data?.data };
}
export function refreshOutstanding() {
  queryClient.invalidateQueries("outstanding");
}
