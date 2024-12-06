import catchAsync from "../../Utilities/catchAsync.js";
import AppError from "../../Utilities/appError.js";
import Transaction from "../../Models/transactionModel.js";
import mongoose from "mongoose";
import { matchDates, matchField } from "./matchingObj.js";

export const particularWiseGst = catchAsync(async (req, res, next) => {
  const { particular } = req.query;
  const query = { ...req.query };
  // Validate particular query parameter
  if (!particular) {
    return next(new AppError("Please provide the 'particular' parameter", 400));
  }

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(particular)) {
    return next(new AppError("Invalid 'particular' ID format", 400));
  }

  const particularId = new mongoose.Types.ObjectId(particular);

  // Perform aggregation
  const result = await Transaction.aggregate([
    {
      $match: { particular: particularId },
    },
    {
      $addFields: {
        // Ensure numeric conversion
        gstPercentNumeric: { $toDouble: "$gstPercent" },
        totalAmtNumeric: { $toDouble: "$totalAmt" },

        // Calculate GST based on gstType
        calculatedGST: {
          $cond: [
            { $eq: ["$gstType", "excl"] },
            {
              $multiply: [
                { $toDouble: "$totalAmt" },
                { $divide: [{ $toDouble: "$gstPercent" }, 100] },
              ],
            },
            {
              $cond: [
                { $eq: ["$gstType", "incl"] },
                {
                  $multiply: [
                    { $toDouble: "$totalAmt" },
                    {
                      $divide: [
                        { $toDouble: "$gstPercent" },
                        { $add: [100, { $toDouble: "$gstPercent" }] },
                      ],
                    },
                  ],
                },
                0,
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalInGst: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$type", "Credit"] },
                  { $ne: ["$isGstDeduct", true] },
                ],
              },
              "$calculatedGST",
              0,
            ],
          },
        },
        totalOutGst: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$type", "Debit"] },
                  { $ne: ["$isGstDeduct", true] },
                ],
              },
              "$calculatedGST",
              0,
            ],
          },
        },
        totalCredit: {
          $sum: {
            $cond: [
              { $eq: ["$type", "Credit"] },
              { $toDouble: "$totalAmt" },
              0,
            ],
          },
        },
        totalDebit: {
          $sum: {
            $cond: [{ $eq: ["$type", "Debit"] }, { $toDouble: "$totalAmt" }, 0],
          },
        },
      },
    },
  ]);

  // Handle empty results
  if (!result.length) {
    return res.status(404).json({
      message: "No data found for the specified 'particular'",
      status: "Failure",
      result,
    });
  }

  // Respond with the result
  res.status(200).json({
    message: "Successfully fetched",
    status: "Success",
    result,
  });
});
