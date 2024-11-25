import mongoose from "mongoose";
import Branch from "../Models/branchModel.js";
import Liablity from "../Models/liabilityModel.js";
import Transaction from "../Models/transactionModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { currentDateFormatter } from "../Utilities/helper.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";

export const allMonthBranchPnl = catchAsync(async (req, res, next) => {
  const { branch } = req.query;

  if (!branch)
    return next(
      new AppError("You must provide the branch to access this route", 400)
    );

  const allMonth = await Transaction.aggregate([
    {
      $match: {
        "branches.branchName": branch,
      },
    },
    {
      $addFields: {
        month: { $month: "$date" },
        year: { $year: "$date" },
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
          year: "$year",
        },
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$type", "Credit"] }, "$amount", 0],
          },
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$type", "Debit"] }, "$amount", 0],
          },
        },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        year: "$_id.year",
        totalIncome: 1,
        totalExpense: 1,
      },
    },
  ]);

  // Generate a list of all months (January to December)
  const monthsList = [
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

  // Create a mapping of months to ensure all months are represented
  const monthMap = monthsList.map((name, index) => ({
    month: index + 1, // Month number
    monthName: name,
    totalIncome: 0,
    totalExpense: 0,
  }));

  // Merge the aggregated data with the full list of months
  allMonth.forEach(({ month, year, totalIncome, totalExpense }) => {
    const monthObj = monthMap.find((m) => m.month === month);
    if (monthObj) {
      monthObj.totalIncome = totalIncome;
      monthObj.totalExpense = totalExpense;
    }
  });

  // Sort the result by month
  monthMap.sort((a, b) => a.month - b.month);

  res.status(200).json({
    status: "Success",
    message: "Successfully fetched",
    data: monthMap,
  });
});

export const monthWiseBranchPnl = catchAsync(async (req, res, next) => {
  const { month, year } = currentDateFormatter(new Date());

  // Calculate the next month and year for date range
  const nextMonth =
    parseInt(month) === 12
      ? "01"
      : (parseInt(month) + 1).toString().padStart(2, "0");
  const nextYear = parseInt(month) === 12 ? parseInt(year) + 1 : year;

  const branchesList = getBranches;

  const transactionStatsPromise = Transaction.aggregate([
    {
      $match: {
        formattedDate: {
          $gte: `${year}-${month}-01`,
          $lt: `${nextYear}-${nextMonth}-01`,
        },
      },
    },
    {
      $unwind: "$branches",
    },
    {
      $group: {
        _id: "$branches.branchName",
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "Credit"] }, "$branches.amount", 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "Debit"] }, "$branches.amount", 0],
          },
        },
        transactionCount: { $sum: 1 },
      },
    },
    {
      $addFields: {
        sortOrder: {
          $indexOfArray: [branchesList, "$_id"],
        },
      },
    },
    {
      $sort: { sortOrder: 1 },
    },
    {
      $project: {
        _id: 0,
        branchName: "$_id",
        income: 1,
        expense: 1,
        profit: { $subtract: ["$income", "$expense"] },
        transactionCount: 1,
      },
    },
  ]);

  const liabilityStatsPromise = Liablity.aggregate([
    {
      $match: {
        type: "outstanding",
        formattedDate: {
          $gte: `${year}-${month}-01`,
          $lt: `${nextYear}-${nextMonth}-01`,
        },
      },
    },
    {
      $group: {
        _id: "$branch",
        totalOutstanding: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        branchName: "$_id",
        totalOutstanding: 1,
      },
    },
  ]);

  const [transactionStats, liabilityStats] = await Promise.all([
    transactionStatsPromise,
    liabilityStatsPromise,
  ]);

  // Fill missing branches with zeroed data
  const completeStats = branchesList.map((branch) => {
    const branchData = transactionStats.find(
      (stat) => stat.branchName === branch
    ) || {
      branchName: branch,
      income: 0,
      expense: 0,
      profit: 0,
      transactionCount: 0,
    };
    return branchData;
  });

  res.status(200).json({
    status: "Success",
    outstandingTotal: liabilityStats[0],
    stats: completeStats,
  });
});

export const getAllBranch = getAll(Branch);
export const getBranch = getOne(Branch);
export const createBranch = createOne(Branch);
export const updateBranch = updateOne(Branch);
export const deleteBranch = deleteOne(Branch);
