"use client";

import { useSelector } from "react-redux";

export const useParticularFinder = (id) => {
  const { particulars } = useSelector((state) => state.general);
  console.log(particulars, "particulars");
  return particulars?.find((par) => {
    return par._id === id;
  });
};
export const useCategoryFinder = (id) => {
  const { categories } = useSelector((state) => state.general);
  return categories?.find((cat) => cat._id === id);
};
export const useBranchIdFinder = (branchName) => {
  const { branches } = useSelector((state) => state.general);
  return branches?.find((branch) => branch.name === branchName);
};
export const branchFinder = (branchName, branches) => {
  return branches?.find((branch) => branch.name === branchName);
};

export const catIdFinder = (catagories, name) => {
  return catagories.find((cat) => cat.name === name)?._id;
};
export const parIdFinder = (particulars, name) => {
  return particulars.find((par) => par.name === name)?._id;
};
export const bankIdFiner = (banks, bankName) => {
  return banks.find((bank) => bank.name === bankName)?._id;
};

export const getBranchNames = (branches) => {
  if (!branches) return [];
  return branches.map((branch) => branch?.branch?.name);
};
