import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUnivercity = () => {
  const dispatch = useDispatch();

  const { curBranch, page, curType, startDate, endDate, query } = useSelector(
    (state) => state.capital
  );
  const capitalCurBranch = useBranchIdFinder(curBranch);

  let endpoint = `/commission?page=${page}&sort=-date`;

  if (capitalCurBranch) {
    endpoint += `&branch=${capitalCurBranch?._id}`;
  }
  if (!curType.startsWith("All")) {
    endpoint += `&type=${curType}`;
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
    queryKey: ["commission", endpoint],
    queryFn: () => apiClient.get(endpoint).then((res) => res.data),
  });

  useEffect(() => {
    dispatch(setCapitalSummery(data?.summery));
  }, [data, dispatch]);

  return { isLoading, isError, error, refetch, capital: data?.data };
};
export function refreshCapital() {
  queryClient.invalidateQueries("commission");
}
