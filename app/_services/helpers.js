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
