"use client";

import { useSelector } from "react-redux";
import { calculateDateRange, today } from "./helpers";

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
export const useStatusFinder = (id) => {
  const { status } = useSelector((state) => state.general);
  return status?.find((stat) => stat._id === id);
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

export const dateFinder = (selectedDate) => {
  const date = today();
  let startDate = new Date(date);
  let endDate = new Date(date);

  switch (selectedDate) {
    case "Today":
      break;
    case "Yesterday": {
      const { startDate: yesterday } = calculateDateRange(1);
      startDate = new Date(yesterday);
      endDate = new Date(yesterday);
      break;
    }
    case "Last 30 Days": {
      const { startDate: thirtyDays } = calculateDateRange(30);
      startDate = new Date(thirtyDays);
      break;
    }
    case "Last 60 Days": {
      const { startDate: sixty } = calculateDateRange(60);
      startDate = new Date(sixty);
      break;
    }
    case "All": {
      startDate = new Date(new Date().getFullYear(), 0, 1);
      endDate = new Date(today());
      break;
    }
    default: {
      startDate = new Date(new Date().getFullYear(), 0, 1);
      endDate = new Date(new Date(new Date().getFullYear(), 0, 1));
    }
  }
  return { startDate, endDate };
};
