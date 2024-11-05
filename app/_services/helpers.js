import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const truncate = (string, num = 40) => {
  if (string?.length <= num) return string;
  return string?.slice(0, num) + "...";
};

export const useViewEight = (data, startPage, setBtnDisable) => {
  const dispatch = useDispatch();
  const veiwEight = data?.slice(startPage, startPage + 8);
  useEffect(() => {
    if (veiwEight?.length < 8) {
      dispatch(setBtnDisable(true));
    } else {
      dispatch(setBtnDisable(false));
    }
  }, [dispatch, veiwEight?.length]);

  return veiwEight;
};

export const today = () =>
  new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

export function toggleBranch(branch, setSelectedBranches, clearErrors, length) {
  setSelectedBranches((prev) =>
    prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
  );

  if (length === 0) {
    clearErrors("branches");
  }
}

export const validateBranches = (length, setError) => {
  if (length === 0) {
    setError("branches", {
      type: "manual",
      message: "At least one branch must be selected",
    });
    return false;
  }
  return true;
};
