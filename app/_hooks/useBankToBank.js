import { queryClient } from "../_components/layouts/AppLayout";

export const refreshBankToBank = () => {
  queryClient.invalidateQueries(["banktobank"]);
};
