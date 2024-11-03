"use client";

import { useSelector } from "react-redux";

export const useParticularFinder = (id) => {
  const { particulars } = useSelector((state) => state.general);
  return particulars.find((par) => {
    return par._id === id;
  });
};
export const useCategoryFinder = (id) => {
  const { categories } = useSelector((state) => state.general);
  return categories.find((cat) => cat._id === id);
};
