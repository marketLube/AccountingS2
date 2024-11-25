import Transaction from "../Models/transactionModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import mongoose from "mongoose";

export const wholeYearPnl = catchAsync(async (req, res, next) => {
  const { branch } = req.query;

  if (!branch)
    return next(
      new AppError("You must provide the branch to access this route", 400)
    );

  const allMonth = await Transaction.aggregate([
    // Match documents with the specified branch
    {
      $match: {
        "branches.branch": new mongoose.Types.ObjectId(branch),
      },
    },
    // Add fields for the month and year of the transaction date
    {
      $addFields: {
        month: { $month: "$date" },
        year: { $year: "$date" },
      },
    },
    // Group by month and year, calculate total income and expense
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
    // Sort by year and month in ascending order
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
    // Project fields for the final result
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

  // Generate a list of all months with initial income and expense set to 0
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

  const monthMap = monthsList.map((name, index) => ({
    month: index + 1, // Month number
    monthName: name,
    totalIncome: 0,
    totalExpense: 0,
  }));

  // Merge aggregated data into the month map
  allMonth.forEach(({ month, year, totalIncome, totalExpense }) => {
    const monthObj = monthMap.find((m) => m.month === month);
    if (monthObj) {
      monthObj.totalIncome = totalIncome;
      monthObj.totalExpense = totalExpense;
      monthObj.year = year; // Optionally include the year
    }
  });

  res.status(200).json({
    status: "Success",
    message: "Successfully fetched",
    data: monthMap,
  });
});
