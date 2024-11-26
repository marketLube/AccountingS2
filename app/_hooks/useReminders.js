import apiClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../_components/layouts/AppLayout";
import {
  useBranchIdFinder,
  useCategoryNameFinder,
  useParticularNameFinder,
} from "../_services/finders";
import useCatToParticular from "./useCatToParticular";
import {
  setReminderCurParticular,
  setReminderParticular,
  setReminderSummery,
} from "@/lib/slices/reminderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function useReminders() {
  const dispatch = useDispatch();
  const {
    curBranch,
    curCat,
    curParticular,
    page,
    curStatus,
    startDate,
    endDate,
  } = useSelector((state) => state.reminder);
  let endpoint = `/reminders?page=${page}&sort=-date`;

  const branchId = useBranchIdFinder(curBranch)?._id;
  const catagory = useCategoryNameFinder(curCat);
  const particular = useParticularNameFinder(curParticular);

  useCatToParticular(catagory, setReminderParticular, setReminderCurParticular);

  if (branchId) {
    endpoint += `&branch=${branchId}`;
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

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["reminders", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  console.log(data, "data");

  useEffect(() => {
    dispatch(setReminderSummery(data?.summery));
  }, [data, dispatch]);

  return { isLoading, isError, error, refetch, reminders: data?.data };
}
export function refreshReminders() {
  queryClient.invalidateQueries("reminders");
}
