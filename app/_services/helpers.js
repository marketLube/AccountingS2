import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const truncate = (string, num = 40) => {
  if (string?.length <= num) return string;
  return string?.slice(0, num) + "...";
};

export const useViewEight = (data, startPage, setBtnDisable, num = 8) => {
  const dispatch = useDispatch();
  const veiwEight = data?.slice(startPage, startPage + num);
  useEffect(() => {
    if (veiwEight?.length < num) {
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

export const thisYear = () => {
  return new Date().getFullYear();
};

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

export function getCurrentMonthName() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthIndex = new Date().getMonth();
  return monthNames[currentMonthIndex];
}

export default function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits

  return `${year}-${month}-${day}`;
}

export const calculateDateRange = (daysAgo) => {
  const startDate = formatDate(
    new Date(new Date().setDate(new Date().getDate() - daysAgo))
  );
  const endDate = formatDate(new Date());
  return { startDate, endDate };
};

export const formatWithCommas = (number) => {
  // Handle null, undefined, or NaN
  if (number == null || isNaN(number)) return "₹0.00";

  // Ensure the number is a number and has two decimal places
  const numStr = parseFloat(number).toFixed(2);

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = numStr.split(".");

  // Use toLocaleString for Indian number formatting
  const formattedInteger = parseInt(integerPart).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Combine integer part and decimal part with the rupee symbol
  return `${formattedInteger}.${decimalPart}`;
};
