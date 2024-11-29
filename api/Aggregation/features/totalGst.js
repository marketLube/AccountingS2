import mongoose from "mongoose";
import Transaction from "../../Models/transactionModel.js";
import catchAsync from "../../Utilities/catchAsync.js";
import { matchDates, matchField } from "./matchingObj.js";

export const calculateGSTTotals = catchAsync(async (req, res, next) => {
  const query = { ...req.query };

  const matchStage = {};

  const matchingArr = ["catagory", "particular", "bank"];

  matchField(matchingArr, query, matchStage);
  matchDates(query, matchStage);

  if (query.branchId) {
    matchStage["branches.branch"] = new mongoose.Types.ObjectId(query.branchId);
  }

  const totals = await Transaction.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalInGst: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$type", "Credit"] }, // Condition 1
                  { $ne: ["$isGstDeduct", true] }, // Condition 2
                ],
              },
              "$gstPercent", // Value if true
              0, // Value if false
            ],
          },
        },
        totalCredit: {
          $sum: {
            $cond: [{ $eq: ["$type", "Credit"] }, "$amount", 0],
          },
        },
        totalOutGst: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$type", "Debit"] }, // Condition 1
                  { $ne: ["$isGstDeduct", true] }, // Condition 2
                ],
              },
              "$gstPercent", // Value if true
              0, // Value if false
            ],
          },
        },
        totalDebit: {
          $sum: {
            $cond: [{ $eq: ["$type", "Debit"] }, "$amount", 0],
          },
        },
      },
    },
  ]);

  // Initialize default results
  const results = {
    totalCredit: 0,
    totalInPercent: 0,
    totalDebit: 0,
    totalOutPercent: 0,
  };

  // Check if aggregation returned results
  if (totals.length > 0) {
    const totalData = totals[0];

    // Assign values from aggregation results
    results.totalCredit = totalData.totalCredit;
    results.totalIn = (totalData.totalCredit * totalData.totalInGst) / 100;

    results.totalInPercent = totalData.totalInGst;
    results.totalOutPercent = totalData.totalOutGst;

    results.totalDebit = totalData.totalDebit;
    results.totalOut = (totalData.totalDebit * totalData.totalOutGst) / 100;
  }

  // Send response
  res.status(200).json({
    message: "Successfully fetched",
    status: "Success",
    results,
  });
});
