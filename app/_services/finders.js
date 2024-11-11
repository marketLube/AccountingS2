"use client";

import { useSelector } from "react-redux";

export const useParticularFinder = (id) => {
  const { particulars } = useSelector((state) => state.general);
  return particulars?.find((par) => {
    return par._id === id;
  });
};
export const useCategoryFinder = (id) => {
  const { categories } = useSelector((state) => state.general);
  return categories?.find((cat) => cat._id === id);
};
export const useCategoryNameFinder = (name) => {
  const { categories } = useSelector((state) => state.general);
  return categories?.find((cat) => cat?.name === name);
};
export const useParticularNameFinder = (name) => {
  const { particulars } = useSelector((state) => state.general);
  return particulars?.find((par) => par?.name === name);
};
export const useBranchIdFinder = (branchName) => {
  const { branches } = useSelector((state) => state.general);
  return branches?.find((branch) => branch.name === branchName);
};
export const useBankIdFinder = (bankName) => {
  const { banks } = useSelector((state) => state.general);
  return banks?.find((bank) => bank.name === bankName);
};
export const bankFinder = (id, banks) => {
  return banks?.find((bank) => bank._id === id)?.name;
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
  return banks?.find((bank) => bank.name === bankName)?._id;
};
export const useBankFinder = (bankId) => {
  const { banks } = useSelector((state) => state.general);
  return banks?.find((bank) => bank._id === bankId);
};

export const useBranchNameFinder = (id) => {
  const { branches } = useSelector((state) => state.general);
  return branches.find((branch) => branch._id === id)?.name;
};

export const getBranchNames = (branches) => {
  if (!branches) return [];
  return branches.map((branch) => branch?.branch?.name);
};
