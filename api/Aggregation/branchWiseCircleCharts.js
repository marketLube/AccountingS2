import mongoose from "mongoose";
import Transaction from "../Models/transactionModel.js";
import catchAsync from "../Utilities/catchAsync.js";

export const branchWiseCircleCharts = catchAsync(async (req, res, next) => {
  const { branch } = req.query;

  if (!branch) {
    return next(
      new AppError("You must provide the branch ID to access this route", 400)
    );
  }

  // Get current year and the past two years
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const secondLastYear = currentYear - 2;

  const yearly = await Transaction.aggregate([
    // Step 1: Match transactions for the given branch and relevant years
    {
      $match: {
        "branches.branch": new mongoose.Types.ObjectId(branch),
        date: {
          $gte: new Date(`${secondLastYear}-01-01T00:00:00.000Z`),
          $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
        },
      },
    },
    // Step 2: Unwind branches to calculate branch-specific amounts
    {
      $unwind: "$branches",
    },
    // Step 3: Match the specific branch again (in case of multiple branches)
    {
      $match: {
        "branches.branch": new mongoose.Types.ObjectId(branch),
      },
    },
    // Step 4: Group by year and calculate income, expense, and profit
    {
      $group: {
        _id: { year: { $year: "$date" } },
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
      },
    },
    // Step 5: Project the required fields, including percentages
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        income: { $round: ["$income", 2] },
        expense: { $round: ["$expense", 2] },
        profit: { $round: [{ $subtract: ["$income", "$expense"] }, 2] },
        total: { $add: ["$income", "$expense"] },
        incomePercentage: {
          $cond: [
            { $eq: [{ $add: ["$income", "$expense"] }, 0] },
            0,
            {
              $round: [
                {
                  $multiply: [
                    { $divide: ["$income", { $add: ["$income", "$expense"] }] },
                    100,
                  ],
                },
                2,
              ],
            },
          ],
        },
        expensePercentage: {
          $cond: [
            { $eq: [{ $add: ["$income", "$expense"] }, 0] },
            0,
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: ["$expense", { $add: ["$income", "$expense"] }],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
          ],
        },
      },
    },
    // Step 6: Sort by year in descending order
    {
      $sort: { year: -1 },
    },
  ]);

  // Fill in missing years with zero values
  const zeroFilledYears = {
    [currentYear]: {
      year: currentYear,
      income: 0,
      expense: 0,
      profit: 0,
      incomePercentage: 0,
      expensePercentage: 0,
    },
    [lastYear]: {
      year: lastYear,
      income: 0,
      expense: 0,
      profit: 0,
      incomePercentage: 0,
      expensePercentage: 0,
    },
    [secondLastYear]: {
      year: secondLastYear,
      income: 0,
      expense: 0,
      profit: 0,
      incomePercentage: 0,
      expensePercentage: 0,
    },
  };

  // Merge aggregation results with zero-filled data
  const formattedYearly = yearly.reduce((acc, curr) => {
    acc[curr.year] = curr;
    return acc;
  }, zeroFilledYears);

  res.status(200).json({
    status: "Success",
    message: "Successfully fetched yearly data",
    stats: Object.values(formattedYearly).sort((a, b) => b.year - a.year),
  });
});
